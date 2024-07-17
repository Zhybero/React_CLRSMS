

 import { useState, useEffect } from "react";
 import { GetModelViewArchived } from "../FldrFunctions/ClsGetList";
function SearchCanvas(props){
 
  const [searchTerm, setSearchTerm] = useState('');
  const [txtstartDate, settxtstartDate] = useState('');
  const [txtendDate, settxtendDate] = useState('');
  const [tblFileDocumentList1, settblFileDocumentList1] = useState([]);
  //Searched
  const [SRtblFileDocumentList1, setSRtblFileDocumentList1] = useState([]);


  //Extensions
  const FileImageExt = ["jpg", "png", "jpeg", "gif", "bmp", "svg", "webp"];
  const FileWordExt = ["doc", "docx", "rtf", "odt"];
  const FileExcellExt = ["xls", "xlsx", "csv", "ods"];
  const FilePPExt = ["ppt", "pptx", "pps", "ppsx"];

  const fetchMdlFileDocument1 = async () => {
    try {
      settblFileDocumentList1(await GetModelViewArchived());
    } catch {
      console.log("Connection error!");
    }
  };  
  useEffect(()=>{
    fetchMdlFileDocument1(); 
  },[]);

  const handleChange = (event) => {
    fetchMdlFileDocument1(); 
    setSearchTerm(event.target.value); 
    if(txtstartDate && txtendDate){  
        const filteredData = tblFileDocumentList1.filter(item => {
            const itemDate = new Date(item.archivedDate.split('T')[0]);   
            return itemDate >= new Date(txtstartDate) && itemDate <= new Date(txtendDate);
          }); 
          const results = filteredData.filter((item) =>
            item.fileName.toLowerCase().includes(event.target.value.toLowerCase())||
            item.archivedDate.includes(event.target.value)
          );
          setSRtblFileDocumentList1(results);
    }else{
        const results = tblFileDocumentList1.filter((item) =>
            item.fileName.toLowerCase().includes(event.target.value.toLowerCase())||
            item.archivedDate.includes(event.target.value)
          );
          setSRtblFileDocumentList1(results);
    }
  };
  //button
  function btnItem(varItem){
    props.varbtnClickFileDoc(varItem);
    console.log(varItem);
  }
return (
  <>
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offCanvasSearchLabel">
        Search
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div className="offcanvas-body">
      <div className="rounded sticky-top" id="divSearch">
        <div className="d-flex col-12 mb-2">
          <div className="col-md-6">
            <div className="text-start">
              <label htmlFor="lbldateArchived">From:</label>
              <input
                type="date"
                className="form-control mb-1"
                id="lbldateArchived"
                placeholder="Archived Date"
                value={txtstartDate}
                onChange={(e) => settxtstartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 ms-auto">
            <div className="text-start">
              <label htmlFor="lbldateArchived">To:</label>
              <input
                type="date"
                className="form-control mb-1"
                id="lbldateArchived"
                placeholder="Archived Date"
                value={txtendDate}
                onChange={(e) => settxtendDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="input-group rounded">
          <div className="input-group-text bg-white">
            <i className="fa-solid fa-search"></i>
          </div>
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search Documents..."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container mt-3">
        <div className="row user-select-none overflow-auto">
          {searchTerm
            ? SRtblFileDocumentList1.map((item, index) => (
                <div className="col-lg-12 mb-2" key={index}>
                  <button
                    className="btn btn-sm col-12 text-start"
                    onClick={() => btnItem(item)}
                  >
                    <div className="p-2 shadow rounded border-top border-dark border-2 text-start">
                      <small>
                        <i className="fa-solid fa-circle-exclamation"></i> Files
                      </small>

                      <div className="p-2 d-flex">
                        <div className="col-8" style={{ height: "30px" }}>
                          <small> 
                            {item && FileImageExt.includes(
                              item.fileType.toLowerCase()
                            ) ? (
                              <i className="fa-solid fa-file-image me-2"></i>
                            ) :item &&  FileWordExt.includes(
                                item.fileType.toLowerCase()
                              ) ? (
                              <i className="fa-solid fa-file-word me-2"></i>
                            ) :item &&  FileExcellExt.includes(
                                item.fileType.toLowerCase()
                              ) ? (
                              <i className="fa-solid fa-file-excel me-2"></i>
                            ) :item &&  FilePPExt.includes(
                                item.fileType.toLowerCase()
                              ) ? (
                              <i className="fa-solid fa-file-powerpoint me-2"></i>
                            ) :item &&  item.fileType.toLowerCase() === "pdf" ? (
                              <i className="fa-solid fa-file-pdf me-2"></i>
                            ) : (
                              <i className="fa-solid fa-file me-2"></i>
                            )}{" "}
                            {item.fileName.length > 15
                              ? `${item.fileName.substring(0, 30)}...`
                              : item.fileName}
                          </small>
                          </div>
                        <div className="col-4 text-end" style={{ height: "30px" }}>
                        <small>{item.archivedDate.split('T')[0]}</small>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  </>
);
}

export default SearchCanvas;