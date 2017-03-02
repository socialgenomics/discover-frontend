# What predicated search terms can I use?

Predicate terms filter search results to match a specified metadata field and value. For example, searching for datasource:SRA will return all results from the SRA data source. Repositive currently supports the following predicate terms:

* title: "terms included in the title"
* description: "terms included in the description"
* collection: "collection name"
* datasource: "data source name"
* assay: "assay type"

You can apply multiple predicate filters to a single search query. For example, searching `title:"breast cancer" description:"Chinese" datasource:SRA` would show all results that have the words "breast cancer" in the title, "Chinese" in the description and are sourced from the SRA data source.
