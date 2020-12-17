class Match {

    private id :number 
    public hash :any  //change this back dude 
    private startLineA :number;
    private startLineB :number;
    private endLineA :number;
    private endLineB :number;
    private personA :string 
    private personB :string 
    private fileAname :string
    private fileBname :string

    // constructor fot Match
    public constructor(id: number, hash: any, startLineA: number,  endLineA: number, startLineB: number, endLineB: number, personA: string, personB: string, fileAname: string,fileBname: string) {
        this.id = id; 
        this.hash = hash; 
        this.startLineA = startLineA; 
        this.startLineB = startLineB; 
        this.endLineA = endLineA; 
        this.endLineB = endLineB; 
        this.personA = personA
        this.personB = personB 
        this.fileAname = fileAname
        this.fileBname = fileBname
    }


    /**
     * function that converts the matches of the two programs
     * to a JSON object. This is used to send plagarism information
     * to the frontend.
     */
    public convertJSON() {
        let output: JSON;
        let obj :any = 
        {
        "id": this.id,
        "match": 
        [
            {"fileName": this.fileAname, "startLine": this.startLineA, "endLine" : this.endLineA},
            {"fileName": this.fileBname, "startLine": this.startLineB, "endLine" : this.endLineB},
        ]
        }
        output = <JSON>obj;
        return output; 
    }
     

    
}
export default Match 