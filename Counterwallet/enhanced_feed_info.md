#Enhanced Feed Info

Feed providers can initialize a feed via a broadcast where the broadcast text field contains a URL to a specially formatted .json file (e.g. http://www.mydomain.com/foo.json). This allows the feed operator to provide enhanced information to their users.


##Feed URL format

The URL itself in the broadcast text field must conform to the following:
* Must fully fit within the text field space allowed
* May or may not start with "http://" or "https://". If the URL does not start with either, "http://" is assumed
* May or may not end with ".json" (i.e., no specific file name ending is required)
* It is recommended that the server return the JSON data with the correct MIME type set (e.g. "application/json")
* A HTTP 200 response code must be returned (redirects, e.g. 301, 302, etc. are not allowed)

##Feed JSON format

The JSON object/mapping data the URL points to must contain the following data:

<table>
<tr><td><b>address</b></td><td>Required</td><td>The Bitcoin address used to broadcast the json url and that will broadcast the result.</td></tr>
<tr><td><b>title</b></td><td>Required</td><td>The title of the feed. 64 characters max.</td></tr>
<tr><td><b>broadcast_date</b></td><td>Required</td><td>When the bet will be resolved. When type=binary broadcast_date must be a rfc3339 date. When type=cfd broadcast_date must be an iso8601 repeating interval.</td></tr>
<tr><td><b>deadline </b></td><td>Required if type='cfd'.</td><td>Must be an iso8601 repeating interval.</td></tr>
<tr><td><b>targets </b></td><td>Required if type='binary'.</td><td>A list/array of JSON objects. Each object contains details about a potential user choice for the bet. Normally, with binary bets, there is only one target object provided. However, it is possible to provide more than one, but in this case, the user would be able to bet yes or no for each option (meaning, if two targets were provided, there would be 4 separate user choices possible).</td></tr>
<tr><td><b>type</b></td><td>Optional</td><td>The type of the bet. Must be one of: 'binary', 'cfd' or 'all'. If type is not specified, targets OR deadline MUST be provided.</td></tr>
<tr><td><b>category</b></td><td>Optional</td><td>The nature of the feed. Must be one of: 'sports', 'politics', 'entertainment', 'economics', or 'other'.</td></tr>
<tr><td><b>description</b></td><td>Optional</td><td>A longish description about this feed. 255 characters max.</td></tr>
<tr><td><b>image</b></td><td>Optional</td><td>A link a 48x48 PNG image to represent the feed in the graphical user interface listing. The text itself must be a valid URL that starts with "http://" or "https://". The image the URL references must be in PNG format (the URL must end in .png). It must be 48x48, and it must use the RGB or RGBA color palette. If any of these are not correct, the system will reject it.</td></tr>
<tr><td><b>url</b></td><td>Optional</td><td>A link to the website for the feed. 100 characters max. Must be a valid URL that starts with "http://" or "https://"</td></tr>
<tr><td><b>operator</b></td><td>Optional</td><td>Object that contains informations about the feed operator.</td></tr>
<tr><td><b>customs</b></td><td>Optional</td><td>Object that contains additional custom informations about the feed. All values should be integer or string.</td></tr>
<tr><td><b>version</b></td><td>Optional</td><td>Version of the schema used for the json (current 1.0).</td></tr>
<tr><td><b>labels</b></td><td>Optional </td><td>Labels used for CFD bets.</td></tr>
<tr><td><b>labels.bull</b></td><td>Required </td><td>Label for bet type equal BullCFD. 32 characters max.</td></tr>
<tr><td><b>labels.bear</b></td><td>Required </td><td>Label for bet type equal BearCFD. 32 characters max.</td></tr>
<tr><td><b>odds</b></td><td>Optional </td><td>Object that contains default odds for Bull bets (the inverse is used for Bear bets).</td></tr>
<tr><td><b>odds.initial</b></td><td>Required (or odds.suggested)</td><td>Default odds used when there is not open bets.</td></tr>
<tr><td><b>odds.suggested</b></td><td>Required (or odds.initial)</td><td>Default odds used when there is open bets. </td></tr>
</table>

<br/>
<b>'targets' Object format:</b>
<table>
<tr><td><b>text</b></td><td>Required</td><td>Topic of the target_value. 64 characters max.</td></tr>
<tr><td><b>value</b></td><td>Required</td><td>The value used for this target_value.</td></tr>
<tr><td><b>deadline</b></td><td>Required</td><td>The exact or approximate time that the feed will be resolved.</td></tr>
<tr><td><b>image</b></td><td>Optional</td><td>A link a 48x48 PNG image to represent the target_value in the graphical user interface listing.</td></tr>
<tr><td><b>labels</b></td><td>Optional </td><td>Object that contains labels used for each bet type.</td></tr>
<tr><td><b>labels.equal</b></td><td>Required </td><td>Label for Equal. 32 characters max.</td></tr>
<tr><td><b>labels.not_equal</b></td><td>Required </td><td>Label for NotEqual. 32 characters max.</td></tr>
<tr><td><b>odds</b></td><td>Optional </td><td>Object that contains default odds for Equal bets (the inverse is used for NotEqual bets).</td></tr>
<tr><td><b>odds.initial</b></td><td>Required (or odds.suggested)</td><td>Default odds used when there is not open bets.</td></tr>
<tr><td><b>odds.suggested</b></td><td>Required (or odds.initial)</td><td>Default odds used when there is open bets. </td></tr>
</table>

<br/>
<b>'operator' fields:</b>
<table>
<tr><td><b>name</b></td><td>Required</td><td>The operator name.</td></tr>
<tr><td><b>description</b></td><td>Optional</td><td>A longish description about the operator. 2048 characters max.</td></tr>
<tr><td><b>image</b></td><td>Optional</td><td>A link a 48x48 PNG image to represent the operator in the graphical user interface listing.</td></tr>
<tr><td><b>url</b></td><td>Optional</td><td>A link to the website for the operator. 100 characters max. Must be a valid URL that starts with "http://" or "https://"</td></tr>
</table>


## Examples

Here's an example for a binary feed called <b>Superbowl 2014</b>:
<blockquote><pre>
{
    "version": "1.0",
    "address": "muYJYjRZDPmTEMfyEGe34BGN8tZ6rmRZCu",
    "type": "binary",
    "category": "sports",
    "title": "Superbowl 2014",
    "image": "https://www.jahpowerbit.org/feeds/image-1.png",
    "description": "The feed for the Super Bowl final",
    "url": "http://www.jahpowerbit.org/superbowl2014",
    "broadcast_date": "2014-11-01T05:06:07+00:00",
    "operator": {
        "name": "JahPowerBit",
        "image": "https://www.jahpowerbit.org/feeds/image-1.png",
        "description": "Development site",
        "url": "http://www.jahpowerbit.org"
    },
    "targets": [{
        "text": "The Bronco wins",
        "image": "https://www.jahpowerbit.org/feeds/image-1.png",
        "value": 1,
        "labels": {
            "equal": "yes",
            "not_equal": "no"
        },
        "odds": {
            "initial": 2,
            "suggested": 3
        },
        "deadline": "2014-07-01T05:06:07+00:00"
    }, {
        "text": "The Seahawks wins",
        "image": "https://www.jahpowerbit.org/feeds/image-1.png",
        "value": 2,
        "labels": {
            "equal": "yes",
            "not_equal": "no"
        },
        "deadline": "2014-07-01T05:06:07+00:00"
    }, {
        "text": "They draw",
        "image": "https://www.jahpowerbit.org/feeds/image-1.png",
        "value": 3,
        "labels": {
           "equal": "yes",
            "not_equal": "no"
        },
        "odds": {
            "initial": 3,
            "suggested": 4
        },
        "deadline": "2014-09-01T05:06:07+00:00"
    }],
    "customs": {
        "key1": "value1",
        "key2": 2
    }
}
</pre></blockquote>

Here's an example for a cfd feed called <b>Bistamp BTC Price</b>:
<blockquote><pre>
{
	"version": "1.0",
	"address": "mfzSPkV7kAYma5oxZ37pHkw9qtwAEQx8Wy",
	"type": "cfd",
	"category": "economics",
	"title": "Bistamp BTC Price",
	"image": "https://www.jahpowerbit.org/feeds/image-1.png",
	"description": "Bitstamp price broadcasted each hour",
	"url": "http://www.jahpowerbit.org/bitstamp",
	"broadcast_date": "R/2014-05-01T05:06:07+00:00/PT1H",
	"deadline": "R/2014-05-08T05:06:07+00:00/P7D",
	"odds": {
		"initial": 2,
		"suggested": 3
	},
	"labels": {
		"bull": "to the moon!!",
		"bear": "to the abyss!!"
	},
	"operator": {
		"name": "JahPowerBit",
		"image": "https://www.jahpowerbit.org/feeds/image-1.png",
		"description": "Development site",
		"url": "http://www.jahpowerbit.org"
	}
}
</pre></blockquote>

## Other Topics

###Validity and refreshing
In order for this data file to be deemed as valid against the specified address, there must have been a broadcast at that address, and the text field of that broadcast must have been set to the URL of this JSON file and the value field set to -1. From this feed broadcast, Counterwallet system will pull the fee-fraction, to use as the fee for the given feed, and will query this URL provided to validate and fetch the necessary information. 

If the information you provided is reachable and valid (within a 5 second response time), the feed's information will be enhanced based on this data. If it is not, counterblockd will retry up to 2 additional times, over the next 30 or so minutes, and then give up until rebroadcast is made with a JSON URL and value=-1 (the URL may be the same).

###Validating your JSON data

Your JSON data must respect and validate against [https://github.com/CounterpartyXCP/counterblock/blob/master/counterblock/schemas/feed.schema.json this] JSON schema. If the validation fails on any level, counterblockd will not accept the data.

To check your data against this schema, go [http://json-schema-validator.herokuapp.com/ here]. Paste the schema from the link above into the '''Schema''' field, and place your example output into the '''Data''' field. Then click the '''Validate''' button
