
class APIresponse {
    constructor( data, page, limit, pagecount, totalcount,req) {
        this.data = data;
        this.page = page;
        this.limit = limit;
        this.pagecount = pagecount;
        this.totalcount = totalcount;
        this.links={}
        let appUrl = new URL(req.originalUrl, req.protocol + '://' + req.get('host'));
        console.log(appUrl)
        this.addSelfLink(appUrl);
        if (page >= 1 && page < pagecount)
            this.addNextLink(appUrl);
        if (page > 1 && page <= pagecount)
            this.addPrevLink(appUrl);
    }

    addSelfLink(appUrl) {
        if(this.page > 0 ) appUrl.searchParams.set("page",this.page);
        if(this.limit > 0 ) appUrl.searchParams.set("limit",this.limit)
        this.links.self = appUrl.href; // self page
    }

    addNextLink(appUrl) {
        const afterPage = this.page + 1;
        appUrl.searchParams.set("page",afterPage);
        this.links.next = appUrl.href; // next page
        appUrl.searchParams.set("page",this.pagecount)
        this.links.last = appUrl.href; // last page
    }

    addPrevLink(appUrl) {
        const prevPage = this.page - 1;
        appUrl.searchParams.set("page",prevPage)
        this.links.prev = appUrl.href; // prev page
        appUrl.searchParams.set("page",1)
        this.links.first = appUrl.href; // first page
    }
        
      
    


      
}
export default APIresponse;