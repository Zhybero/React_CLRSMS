import PlsConnect from "./ClsGetConnection"; 


export async function GetModeltblProjectsList() {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblProjectsList`
    );
    const data = await response.json();
    return data;
  }

export async function GetModeltblDocumentTypeList(varProjCode) {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblDocumentTypeList?varProjCode=${varProjCode}`
    );
    const data = await response.json();
    return data;
  }

export async function GetModeltblFileDocumentsList(varDocTypeCode) {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblFileDocumentsList?varDocTypeCode=${varDocTypeCode}`
    );
    const data = await response.json();
    return data;
  }

export async function GetModeltblFileDocumentsList1(varFileIC) {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblFileDocumentsList1?varFileIC=${varFileIC}`
    );
    const data = await response.json();
    return data;
  }



export async function GetModelViewArchived() {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModelViewArchived`
    );
    const data = await response.json();
    return data;
  }
  //Download File
  export const downloadFile = async (varFileList) => {
    try {
      const response = await fetch(`${PlsConnect()}/API/WebAPI/DownloadFileGuid?fileName=${varFileList.fileNameGUID}`);
      if (!response.ok) {
        throw new Error('File not found');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = varFileList.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Handle error
    }
  };
  export const getFile = async (fileName) => {
    try {
        
  const fileExtension = fileName.split('.').pop();
        // Create a URL for the blob and open it in a new tab
        console.log(fileExtension.toLowerCase());
        if(fileExtension.toLowerCase()==="docx"||fileExtension.toLowerCase()==="doc"){
          displayDocument(`${PlsConnect()}/API/WebAPI/GetFilePrint?fileName=${fileName}`);
        }else{ 
          const response = await fetch(`${PlsConnect()}/API/WebAPI/GetFilePrint?fileName=${fileName}`);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        }
    } catch (error) {
        console.error('Error fetching file:', error);
    }
};
const getFileViewerURL = (fileURL) => {
  return `https://docs.google.com/viewer?url=${fileURL}&embedded=true`;
};

const displayDocument = (fileURL) => {
  const viewerURL = getFileViewerURL(fileURL);
  window.open(viewerURL, '_blank');
};
  
export async function GetModeltblGroup() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblGroup`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblObjects() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblObjects`
  );
  const data = await response.json();
  return data;
}

export async function GetModeltblPermission(strGroupCode) {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblPermission?strGroupCode=${strGroupCode}`
    );
    const data = await response.json();
    return data;
  }
  
  export async function GetModeltblAPSchedule(varFilterDate) { 
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblAPSchedule?varFilterDate=${varFilterDate}`
    );
    const data = await response.json();
    return data;
  }
  
  export async function GetModeltblAPScheduleTasks(varFilterDate) { 
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblAPScheduleTasks?varFilterDate=${varFilterDate}`
    );
    const data = await response.json();
    return data;
  }
  
  export async function GetModeltblAPScheduleSpecific(varFilterDate) { 
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblAPScheduleSpecific?varFilterDate=${varFilterDate}`
    );
    const data = await response.json();
    return data;
  }
  
  export async function GetModeltblUserSpecific(varUserCode) { 
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblUserSpecific?varUserCode=${varUserCode}`
    );
    const data = await response.json();
    return data;
  }
  
 
export async function GetModeltblAPMatter() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAPMatter`
  );
  const data = await response.json();
  return data;
}
 
export async function GetModelViewAPNamePending() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewAPNamePending`
  );
  const data = await response.json();
  return data;
}
 
export async function GetModelViewAPNameApprove() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewAPNameApprove`
  );
  const data = await response.json();
  return data;
}
 
export async function GetModelViewAPNameHearing() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewAPNameHearing`
  );
  const data = await response.json();
  return data;
}
 
export async function GetModelViewAPNameFinish() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewAPNameFinish`
  );
  const data = await response.json();
  return data;
}
 
export async function GetModelViewAPNameArchived() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewAPNameArchived`
  );
  const data = await response.json();
  return data;
}
 
export async function GetModeltblAppointments(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointments?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAppointmentsAll() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointmentsAll`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAppointmentsApproved(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointmentsApproved?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAppointmentsApprovedforHearing(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointmentsApprovedforHearing?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAppointmentsFinishedHearing(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointmentsFinishedHearing?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAppointmentsFinishedHearingArchived(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointmentsFinishedHearingArchived?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAppointmentsforUser(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointmentsforUser?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAppointmentsforNotifications(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAppointmentsforNotifications?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
 
export async function GetModeltblUser() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblUser`
  );
  const data = await response.json();
  return data;
}

export async function GetCountAppointment(varCode) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointment?varCode=${varCode}`
  );
  const data = await response.json();
  return data;
}
export async function GetCountAppointmentByDate(varapDate) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentByDate?varapDate=${varapDate}`
  );
  const data = await response.json();
  return data;
}
export async function GetCountfiles() { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountfiles`
  );
  const data = await response.json();
  return data;
} 
export async function GetCountCases() { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountCases`
  );
  const data = await response.json();
  return data;
}
export async function GetCountAppointmentToday() { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentToday`
  );
  const data = await response.json();
  return data;
}
export async function GetCountAppointmentTodayUser(varUser) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentTodayUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}
export async function GetCountAppointmentUpcoming() { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentUpcoming`
  );
  const data = await response.json();
  return data;
}
export async function GetCountAppointmentUpcomingUser(varUser) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentUpcomingUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}
export async function GetCountAppointmentMissed() { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentMissed`
  );
  const data = await response.json();
  return data;
}
export async function GetCountAppointmentMissedUser(varUser) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentMissedUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}
export async function GetCountUsers() { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountUsers`
  );
  const data = await response.json();
  return data;
} 
export async function GetCountNotif(strUserCode) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountNotif?strUserCode=${strUserCode}`
  );
  const data = await response.json();
  return data;
} 
export async function GetCountNotifAppointments(strUserCode) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountNotifAppointments?strUserCode=${strUserCode}`
  );
  const data = await response.json();
  return data;
} 
export async function GetModelViewNotification(strUserCode) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewNotification?varUserCode=${strUserCode}`
  );
  const data = await response.json();
  return data;
} 
export async function GetModeltblUserForMessage(strGroupCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblUserForMessage?strGroupCode=${strGroupCode}`
  );
  const data = await response.json();
  return data;
}
export async function GetModelViewInboxName(varUserCode) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewInboxName?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}  
export async function GetModelViewSentboxName(varUserCode) { 
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewSentboxName?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}  
export async function GetModelViewInbox(varUserCode, varToUserCode) {  
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewInbox?varUserCode=${varUserCode}&varToUserCode=${varToUserCode}`
  );
  const data = await response.json();
  return data;
} 
export async function GetModeltblMessageList(varemail) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblMessageList?varemail=${varemail}`
  );
  const data = await response.json();
  return data;
}
export async function GetModeltblMessage1List1(varFileIC) {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/GetModeltblMessage1List1?varFileIC=${varFileIC}`
    );
    const data = await response.json();
    return data;
  }
export async function GetImg(fileName) {
    const response = await fetch(
      `${PlsConnect()}/API/WebAPI/getfileUploaded/getfile?fileName=${fileName}`
    );
    if (!response.ok) {
      console.log(`Failed to fetch image: ${response.status}`);
    }
    
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob); 

    return imageUrl;
  }
  
export async function GetModeltblUserCredSpecific(varUserCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblUserCredSpecific?varUserCode=${varUserCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAPSchedTime(varCode) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAPSchedTime?varCode=${varCode}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAPEvidences1(varfileIC) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAPEvidences1?varfileIC=${varfileIC}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModeltblAPEvidencesList(varAPCode, varFileType) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModeltblAPEvidencesList?varAPCode=${varAPCode}&varFileType=${varFileType}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModelViewCountDE() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewCountDE`
  );
  const data = await response.json();
  return data;
}
  
export async function GetModelViewCountAP() {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetModelViewCountAP`
  );
  const data = await response.json();
  return data;
}
  
export async function GetCountAppointmentPendingUser(varUser) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentPendingUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}
  
export async function GetCountAppointmentApprovedUser(varUser) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentApprovedUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}

export async function GetCountAppointmentOngoingUser(varUser) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentOngoingUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}

export async function GetCountAppointmentFinishUser(varUser) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentFinishUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}

export async function GetCountAppointmentDeclineUser(varUser) {
  const response = await fetch(
    `${PlsConnect()}/API/WebAPI/GetCountAppointmentDeclineUser?varUser=${varUser}`
  );
  const data = await response.json();
  return data;
}