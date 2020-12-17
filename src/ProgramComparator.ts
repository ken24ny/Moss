import FileComparator from "../src/FileComparator"
import MyFile from "../src/MyFile"


export class ProgramComparator {

    private filearray1: Array<MyFile>
    private filearray2: Array<MyFile>

    public constructor(filearray1: Array<MyFile>,filearray2: Array<MyFile>) {
        this.filearray1 = filearray1;
        this.filearray2 = filearray2;

    }

    public compareall(kgram:number,window:number) {
        let fc = new FileComparator();
        for(let fileA of this.filearray1) {
            for(let fileB of this.filearray2) {
                fc.build(fileA,fileB,kgram,window)
            }
        }
    }
}
export default ProgramComparator