## What boolean operators can I use?

Boolean operators allow terms to be combined through logic operators AND, "+", OR, NOT and "-".

**(Note: Boolean operators must be ALL CAPS).**

* " " retrieves results that include those search terms in the exact same order.  
* AND retrieves results that include all of the search terms. To search for data that contain "breast cancer" and "cell line" type the query: `/"breast cancer" AND "cell line"/`
* OR retrieves results that include at least one of the search terms. To search for data that contain either "breast cancer" or "cancer" use the query: `/"breast cancer" OR cancer /` or `/"breast cancer" cancer/`
* NOT excludes selected terms from your search. To search for data that contain "breast cancer" but not "tumour" type to search box: `/"breast cancer" NOT "tumour"/`
* An asterisk at the start or end of a word will perform a truncated search, broadening the search results to include terms with matching word beginnings and endings. For example, searching `meth*` will return results on methylation, methyl, methods and so on.

These are the basic boolean operators. Our search supports Lucene search syntax. You can find more search query examples on the [Lucern website](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html).
