`prefix = AAAAAAAAAAA `

`example = AAAAAAAAAAAAGCGCGCTTAGGAAGAC`


considerations:
#### gens can include A besides prefix
gens found:
 - AGCGCGCTTAGGAAGAC
 - GCGCGCTTAGGAAGAC
 
 #### gen is considered finished both on:
    - string finished
    - next prefix is found and non prefix was found in between
    
####  preprocessing can be heavy, endpoint must be fast
    - data structure chosen: tree
    
## cases not handled:
2 prefixes together
