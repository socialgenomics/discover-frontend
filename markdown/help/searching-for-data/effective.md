# How to build more advanced search queries?

You can also try to use Boolean and predicated search terms to help you refine your search.

Predicate terms filter search results to match a specified metadata field and value. Because the  inconsistency in terminology used by different data sources your search results will vary based on the format of your searched keyword. Hyphens, upper and lower cases can make big difference in your search results.

If you would like to find datasets containing exact format of your searched keyword in specific category (assay, tissue, technology, …) you need to add '.raw' after the category name.

Example:
Search query `assay.raw: "RNA microarray"` will look for all datasets containing exact format and order of "RNA microarray" in the assay category.

Whereas
Search query `assay:RNA microarray` will show you all datasets which have 'RNA' or 'microarray' in the assay category (e.g RNA-Seq, RNA-seq of Coding RNA, RNA microarray,…)

Note:
Hyphens and other punctuation marks split the search term. Search is performed on all words. For example, assay:RNA-Seq searches for any assay type containing 'RNA' or 'Seq'.
**If you want to see datasets with exact format RNA-Seq you need to put assay.raw:RNA-Seq.**

You can use the same analogy for 'tissue.raw:', 'cell-type.raw:' , 'technology.raw:', 'disease.raw:'.

You can apply **multiple predicate filters** to a single search query.

Example:
Searching title:"breast cancer" description:"Chinese" datasource:SRA would show all results that have the words "breast cancer" in the title, "Chinese" in the description and are sourced from the SRA data source.

List of predicated search terms with examples:

	• title: Alzheimer
	• description: Alzheimer late-onset
	• collection: "Single Cell Sequencing Data"
	• datasource: ARRAY_EXPRESS
	• tag: reference
	• assay: ChIP-Seq
	• tissue: "whole blood"
	• technology: Illumina HiSeq 2500
	• cell-type: immortalized cell line
	• ethnicity:hispanic
	• sex:male
	• age:20
	• disease:cancer
	• pmid:21406405 (search by pubmed ID number)
	• samples:10
