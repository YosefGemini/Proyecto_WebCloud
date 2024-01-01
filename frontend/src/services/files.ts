import { get_token } from "./globals";
export interface Files{

  file_name: string,
  file_path: string,
  ticket_id: string,
  file_id: string
}

export async function add_images(data_form: FormData) {
  const res = await fetch(`/api/image`, {
    method: "POST",
    body: data_form,
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}

export function add_file(
  files: FormData,
  token: String | null = get_token()
): Promise<any> {
  if (!token)
    return new Promise((resolve, reject) => {
      resolve(null);
      reject(null);
    });
  return fetch(`/api/file`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: files
  });
}
export function createDataFormFiles(files: FileList) {
  const data_form = new FormData();
  for (let i = 0; i < files.length; i++) {
      data_form.append(files[i].name, files[i]);
  }
  return data_form;
}

export function resetDataForm(dataForm: FormData) {
  console.log("resetDataForm")
  console.log(dataForm)
  dataForm = new FormData();
}

export function appendDataFormFiles(dataForm: FormData, files: FileList) {
  for (let i = 0; i < files.length; i++)
      dataForm.append(files[i].name, files[i]);
  return dataForm;
}
export function print_dataForm(data_form: FormData) {
  console.log("print_data_form function")
  for (const pair of data_form.entries()) { console.log(pair[0] + ", " + pair[1]) }
}

export function isFormDataEmpty(formData: FormData) {
  return formData.entries().next().done;
}
export async function download_file(file_id: string, token: String | null = get_token()) {

  try{

    if (!token)
    return new Promise((resolve, reject) => {
      resolve(null);
      reject(null);
    });


    const res = await fetch(`/api/file/${file_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 200) {
    return res.blob();
  }
  return null;
}
  catch(e){
    console.log(e);
    return null;

  }
  
  
  

}

///  Funciones creadas ṕor Jose 


export function formDataToFileList(formData: FormData): FileList {
  const files: File[] = [];

  formData.forEach((value, key) => {
    if (value instanceof File) {
      files.push(value);
    }
  });

  // Crear un FileList a partir del array de archivos
  const fileList = new DataTransfer();
  files.forEach((file) => {
    fileList.items.add(file);
  });

  return fileList.files;
}
export function buildFormData(ticketId: string, files: FileList): FormData {
  const formData = new FormData();
  formData.append("ticket_id", ticketId);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    formData.append("files", file);
  }

  return formData;
}
