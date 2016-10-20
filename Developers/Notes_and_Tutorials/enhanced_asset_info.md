#Enhanced Asset Info

When initially setting or changing your asset's (token's) description, you can enable enhanced functionality (such as an token image and a longer description) by providing a URL to a specially formatted .json file (e.g. http://www.mydomain.com/foo.json) as the description. This allows the token owner to provide enhanced information to the token's holders, and enhances the user experience for these holders for wallet implementations that support this spec.

Token Info URL format
---------------------------

The URL itself in the broadcast text field must conform to the following:
* Must fully fit within the text field space allowed
* May or may not start with "http://" or "https://". If the URL does not start with either, "http://" is assumed
* Must end with ".json"
* It is recommended that the server return the JSON data with the correct MIME type set (e.g. "application/json")
* A HTTP 200 response code must be returned (redirects, e.g. 301, 302, etc. are not allowed)

## Token Info JSON format

The JSON object/mapping the URL points to must contain the following data:

<table>
<tr><td><b>asset</b></td><td>Required</td><td>The name of the token. Must match your token's name exactly. 24 characters max.</td></tr>
<tr><td><b>description</b></td><td>Optional</td><td>A longish description about this token. 2048 characters max.</td></tr>
<tr><td><b>image</b></td><td>Optional</td><td>A link a 48x48 PNG image to represent the token on the leaderboard and portfolio views. The text itself must be a valid URL that starts with "http://" or "https://" (100 characters max). The image the URL references must be in PNG format (the URL must end in .png). It must be 48x48, and it must use the RGB or RGBA color palette. If any of these are not correct, the system will reject it.</td></tr>
<tr><td><b>website</b></td><td>Optional</td><td>A link to the website for the token. 100 characters max. Must be a valid URL that starts with "http://" or "https://"</td></tr>
<tr><td><b>pgpsig</b></td><td>Optional</td><td>A link to a pgp signature text/file that will or can be used to sign messages by the issuer of this token. 100 characters max. Must be a valid URL that starts with "http://" or "https://"</td></tr>
</table>

Examples
--------

Here's an example for a token called <b>MYTOKEN</b>:

      { "asset": "MYTOKEN", "description": "This is a description of
      MYTOKEN", "image": "http://www.mysite.com/mytoken.png", "website":
      "http://www.mysite.com", "pgpsig":
      "http://www.mysite.com/MYTOKEN.pgp" }

Other Topics
------------

###Validity and refreshing

Every 30-60 minutes, the Counterwallet system will query this URL provided to validate and fetch the necessary information. If the information you provided is reachable and valid (within a 1 second response time), your token's information will be enhanced based on this data.
In order for this data file to be deemed as valid for a specific token/asset, there must have been either an initial issuance, or a description change transaction for that asset, and the text field of that description must have been set to the URL of this JSON file. If the information you provided is reachable and valid (within a 5 second response time), your token's information will be enhanced based on this data. If it is not, counterblockd will retry up to 2 additional times, over the next 30 or so minutes, and then give up until another transaction is made that changes the description field (it may be to the same URL, but another description change transaction is necessary to reinitialize the validity check by counterblockd).

### Validating your JSON data

Your JSON data must respect and validate against [this][] JSON schema.
If the validation fails on any level, counterblockd will not accept the
data.

To check your data against this schema, go [here][]. Paste the schema
from the link above into the **Schema** field, and place your example
output into the **Data** field. Then click the **Validate** button

  [this]: https://raw.githubusercontent.com/CounterpartyXCP/counterblock/master/counterblock/schemas/asset.schema.json
  [here]: http://json-schema-validator.herokuapp.com/
