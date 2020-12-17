class MyFile {
    private name :string 
    private content :Buffer
    private submitter :string


    // constructor for MyFile
    public constructor(name:string, content:Buffer, submitter:string) {
        this.name = name; 
        this.content = content; 
        this.submitter = submitter;  
    }

    /**
     * getter method to get the name
     */
    public getName() {
        return this.name; 
    }


    /**
     * getter method to get the content
     */
    public getContent() {
        return this.content; 
    }


    /**
     * getter method to get the submitter
     */
    public getSubmitter() {
        return this.submitter; 
    }

}

export default MyFile