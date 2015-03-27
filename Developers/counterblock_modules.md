Writing counterblock Modules (Plugins)
=============================================

``counterblock`` allows the default set of processors and/or event handlers to be disabled or re-prioritized.
Additional processors and/or event handlers can also be added. This allows developers to easily extend the
capabilities of ``counterblock``, as well as deactivate unused portions of the system as necessary.

`counterblock` ships out of the box with the following core modules:

* `assets`: Implements basic asset functionality, such as extended asset info parsing, basic asset-related APIs, and more.
* `betting`: Implements betting-specific API calls, tasks, and more.
* `dex`: Implements API methods, order book and market info parsing, and more for Counterparty's distributed exchange. (Requires that the `assets` module be loaded for use.)
* `transaction_stats`: Handles the compliation of transaction statistics.
* `counterwallet`: Implements Counterwallet-specific API calls, tasks, and more. (Requires that the `assets` module be loaded for use.)
* `counterwallet_iofeeds`: Adds socket.io feed support, as well as a chat feed and a message feed, used by Counterwallet.

Any of these core modules may be enabled or disabled, allowing you to tune `counterblock` to your exact needs out of the box.

This document discusses how you can write your own custom modules for `counterblock`, as well as covering the APIs and specifics of how the above core modules were written.

configuration file
----------------------
All configurations are contained in ``modules.conf`` by default (or ``modules.testnet.conf`` for testnet), which should be placed in to the counterblock `config-dir` (`~xcp/.config/counterblock` on a federated node). To load a custom module specify the module path under ``[LoadModule]`` relative to
the `counterblock base-dir`. i.e.:

    [LoadModule]
    'lib/vendor' = True
    
The above configuration would look for a `vendor.py`, or `vendor` folder (with required `__init__.py` file present), and load the plugin code from there.

To change the default behavior for ``counterblock`` modules/events, change the corresponding processor config.
(Note: function names must be exact.) 

To disable a processor:

    #(must be bool)
    [BlockProcessor]
    generate_wallet_stats = False

To change a processor's priority:

    #(must be int) 
    [MessageProcessor]
    parse_issuance = 5
    
To change priority and enable:

    #(tuple, order does not matter)
    [MessageProcessor]
    parse_issuance = 5, True 
    parse_issuance = True, 5
    
Here's an extensive ``counterblock`` ``modules.conf`` example config file:

    [MessageProcessor]
    #Tweak core messaging processing
    # (don't use these unless you know what you're doing)
    handle_exceptional = True
    handle_invalid = True
    parse_insert = True
    handle_reorg = True
    parse_issuance = 10, True
    parse_balance_change = True
    parse_trade_book = True
    parse_broadcast = True
    
    [StartUpProcessor]
    #Enable/disable core functionality (all enabled by
    # default, don't use these unless you know what you're doing)
    start_cpd_blockfeed = True
    check_blockchain_service = True
    expire_stale_orders = True
    start_api = True
    
    [LoadModule]
    #Load custom modules
    lib/modules/reparse_timer = True

Command-line functions
-----------------------------

To enable a custom module in ``counterblock``:

    counterblock enmod 'lib/vendor'
    
To disable a loaded module:

    counterblock dismod 'lib/vendor' 

To list loaded modules and processors:

    counterblock listmod

Adding Custom Methods
-----------------------------------
For Adding custom methods to built in ``counterblock`` processors. The general syntax is:

```python
    from lib.processor import <processor_name> 
        @<processor_name>.subscribe(enabled=<bool>, priority=<int>)
```

If not specified, the defaults are ``enabled=true, priority=0``.
When a processor is triggered methods are run in order of priority from the highest.
*Please note that any priority less than ``0`` or greater than ``1000`` is reserved for internal ``counterblock``
functionality, and custom plugins should only utilize priority settings under this number.*

```python
    @<Processor>.subscribe()
```

**MessageProcessor**

``MessageProcessor`` runs once for each message as obtained from the `counterpartyd` message feed, for all activity that has been confirmed on the blockchain (i.e. at least 1 Bitcoin confirmation). ``msg`` will pass the message
 in the same format as the ``get_messages`` counterpartyd api method, msg_data corresponds to ``json.loads(msg['bindings'])``. 

```python
    @MessageProcessor.subscribe(enabled=True, priority=90) 
    def custom_received_xcp_alert(msg, msg_data):
        if msg['category'] != 'sends': return
        if message['status'] != 'valid': return
        if not msg_data['destination'] in MY_ADDRESS_LIST: return
        if not msg_data['asset'] == 'XCP': return 
        print('Received %s XCP at My Address %s from %s' %(
        	(float(msg_data['quantity'])/10**8), msg_data['destination'], msg_data['source']))
        return
```

Note that with ``MessageProcessor`` handlers, you can return ``'continue'`` to prevent the running of further MessageProcessors (i.e. of lesser priority than the current one) for the message being currently processed.

**MempoolMessageProcessor**

``MempoolMessageProcessor`` also exists and works similar to ``MessageProcessor``, however, for messages out the mempool (i.e.
that are not confirmed and included on the blockchain yet). The format of the data supplied to the processor is slightly different though, and looks like this:

```python
    @MempoolMessageProcessor.subscribe(enabled=True, priority=90) 
    def custom_received_xcp_alert(msg, msg_data):
        assert msg['_message_index'] == 'mempool'
        assert msg['tx_hash']
        assert msg['command']
        assert msg['category']
        assert msg_data #the actual message data
        assert msg['timestamp']
        assert msg['viewed_in_block']
        
        #prevent running of further MempoolMessageProcessors of lesser priority for the message being processed
        return 'continue'
```

**BlockProcessor**

``BlockProcessor`` run once per new block, after all ``MessageProcessor`` functions have completed. 

```python
    @BlockProcessor.subscribe(priority=0) 
    def alertBlock(): 
        print('Finished processing messages for this block')
```

**config.state**

A number of changing variables that a module may need to access are stored in ``config.state`` - For example if you
want to run a process for every new block (but not when counterblock is catching up). 

```python
    @BlockProcessor.subscribe() 
    def my_custom_block_event(): 
        if not (config.state['cpd_latest_block_index'] - config.state['my_latest_block']['block_index']) == 1: 
            return
        #Do stuff here
```

**StartUpProcessor**

``StartUpProcessor`` runs once on ``counterblock`` startup. 

```python
    @StartUpProcessor.subscribe()
    def my_db_config(): 
        config.my_db = pymongo.Connection()['my_db'] 
```

**CaughtUpProcessor**

``CaughtUpProcessor`` runs once when ``counterblock`` catches up to the latest Counterpartyd block. 

```python
    @CaughtUpProcessor.subscribe()
    def caughtUpAlert(): 
        print('counterblock is now caught up to Counterpartyd!') 
```

**RollbackProcessor**

``RollbackProcessor`` runs whenever the ``counterblock`` database is rolled back (either due to a blockchain
reorg, or an explicit rollback command being specified to ``counterblock`` via the command line).

Note that if this processor runs and ``None`` is passed as ``max_block_index``, it means that there was a reparse of
all block data.

```python
    @RollbackProcessor.subscribe()
    def rollbackAlert(max_block_index): 
        print('counterblock block database rolled back! Anything newer than block index %i removed!' % max_block_index) 
```

**Enhancing the API**

To add a method from a module to the API dispatcher: 

```python
    from lib.processor import API
    
    #(note that the dispatcher add_method does not take arguments) 
    @API.add_method
    def my_foo_api_method(): 
        return 'bar'
```

**start_task**

To start a task that runs in a seperate lightweight thread (either immediately, or with a delay), use ``start_task``:

```python
    from lib.processor import start_task
    
    def run_my_task():
        print("Foo bar!!")
        #start again in 5 minutes
        start_task(run_my_task, delay=5*60)
        
    #start task the first time with no delay
    start_task(run_my_task)
```
