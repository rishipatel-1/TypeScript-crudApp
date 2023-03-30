interface Image {
  name: string;
  type: string;
  size: number;
  dataUrl?: string;
}

class Details {
  private form: HTMLFormElement;
  private input: HTMLInputElement;

  constructor() {
    this.form = document.getElementById('addFormDetails') as HTMLFormElement;
    this.input = this.form.querySelector('input[type="file"]') as HTMLInputElement;

    this.form.addEventListener('submit', this.handleSubmit);
    this.input.addEventListener('change', this.handleFileChange);
  }
  reset() {
    this.form.reset();
  }
  private handleSubmit = (event: Event) => {
    event.preventDefault();
    
  }

  private handleFileChange = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const image: Image = {
      name: file.name,
      type: file.type,
      size: file.size
    };

    try {
      image.dataUrl = await this.imageToBase64(file);
      console.log(image);

      const details = new Details(); 
      
      
    } catch (error) {
      console.error(error);
    }
  }

  public compressImage = (image: Blob | null): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!image) {
        reject('Image is null or undefined');
        return;
      }
  
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
  
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/jpeg', 0.7);
      };
  
      img.onerror = (error) => {
        reject(error);
      };
  
      img.src = URL.createObjectURL(image);
    });
  }
  
  public imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
  
      fileReader.onload = async () => {
        if (fileReader.result !== null)
         { 
          const compressedImage = await this.compressImage(new Blob([fileReader.result], { type: file.type }));
          const compressedFileReader = new FileReader();
          compressedFileReader.readAsDataURL(compressedImage);
  
          compressedFileReader.onload = () => {
            resolve(compressedFileReader.result as string);
          };
  
          compressedFileReader.onerror = (error) => {
            reject(error);
          };
        } else {
          reject(new Error('Failed to read file'));
        }
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
}
const details = new Details();

type Product = {
  product_id: number, 
  ProductName: string,
  ProductPrice: string,
  Image: string,
  description: string,
}






async function readFormData(): Promise<void> {
  let array: Product[] = JSON.parse(localStorage.getItem("data")!) ?? [];
  let formData: Product = {} as Product;
  formData.product_id = Math.floor(Math.random() * 1000);
  formData.ProductName = (document.getElementById('productName') as HTMLInputElement).value;
  formData.ProductPrice = (document.getElementById('productPrice') as HTMLInputElement).value;
  let stringFile = await details.imageToBase64((document.getElementById('Image') as HTMLFormElement).files[0]);
  formData.Image = stringFile;
  formData.description = (document.getElementById('description') as HTMLInputElement).value;

  array.push(formData);
  localStorage.setItem("data", JSON.stringify(array));
  displayData();
  (document.querySelector("#closebtn") as HTMLElement).click();
}

window.onload = displayData;

function displayData(): void {
  let obj: Product[] = JSON.parse(localStorage.getItem("data")!) ?? [];
  let data = '';
  let filterData = '<option class="text-dark" value="all">ALL</option>';
  obj.forEach((product) => {
    data += ` <div class="card m-2 col-lg-3 col-md-6 col-sm-12 col-8" >
      <img class="card-img-top mt-3"" src="${product.Image}" alt="Card image cap" style="width:100%; height:100%" >
      <div class="card-body">
        <h5 class="card-title Card-text mt-3">${product.ProductName}</h5>
        <p class="card-text Card-text mt-3"> ${product.ProductPrice}</p>
        <p class="card-text Card-text">${product.description}</p>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#update-product-modal" onclick="updateProduct(${product.product_id})">update </button>
        <button class="btn-danger btn " onclick="deleteProduct(${product.product_id})">Delete</button>
      </div>
    </div>`;

    filterData += `<option class="text-dark" value="${product.product_id}">${product.product_id}(${product.ProductName})</option>`;

  })
  document.getElementById('filter-select-input')!.innerHTML = filterData;
  document.getElementById('products-display')!.innerHTML = data;
}

function displayData1(products: Product[]): void {
  let obj = products;
  let data = '';

  obj.forEach((product) => {
    data += ` <div class="card m-2 col-lg-3 col-md-6 col-sm-12 col-8">
      <img class="card-img-top mt-3"" src="${product.Image}" alt="Card image cap ">
      <div class="card-body">
        <h5 class="card-title Card-text">${product.ProductName}</h5>
        <p class="card-text Card-text">${product.ProductPrice}</p>
        <p class="card-text Card-text">${product.description}</p>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#update-product-modal" onclick="updateProduct(${product.product_id})">update </button>
        <button class="btn-danger btn " onclick="deleteProduct(${product.product_id})">Delete</button>
      </div>
    </div>`;

  })

  document.getElementById('products-display')!.innerHTML = data;
}

function OnClose(): void {
  details.reset();

}



function deleteProduct(indx: number): void {
  let array: any[] = JSON.parse(localStorage.getItem("data")!) ?? [];
  array = array.filter((ele) => indx !== ele.product_id);

  localStorage.setItem("data", JSON.stringify(array));
  displayData();
}

function updateProduct(pid: number): void {
  let array: any[] = JSON.parse(localStorage.getItem("data")!) ?? [];
  const elem = array.filter((ele) => pid === ele.product_id);

  (document.getElementById("update-productName") as HTMLInputElement).value = elem[0].ProductName;
  (document.getElementById("update-productPrice") as HTMLInputElement).value = elem[0].ProductPrice;
  (document.getElementById('update-description') as HTMLInputElement).value = elem[0].description;
  (document.getElementById('hiddentproductid') as HTMLInputElement).value = elem[0].product_id;
}

async function updateData(): Promise<void> {
  const id = (document.getElementById('hiddentproductid') as HTMLInputElement).value

  let imagess: string | null = null;

  if ((document.getElementById('Image') as HTMLFormElement).files[0]) {
    imagess = await details.imageToBase64((document.getElementById('Image') as HTMLFormElement).files[0]);
  }
  let array: any[] = JSON.parse(localStorage.getItem("data")!) ?? [];
  array = array.map((ele) => {
    const formData: any = {}
    if (ele.product_id === parseInt(id)) {

      if (imagess !== null) {
        ele.Image = imagess;
      }
      ele.ProductName = (document.getElementById('update-productName') as HTMLInputElement).value
      ele.ProductPrice = (document.getElementById('update-productPrice') as HTMLInputElement).value
      ele.description = (document.getElementById('update-description') as HTMLInputElement).value
    }

    return ele;
  })

  
  localStorage.setItem("data", JSON.stringify(array));
  displayData();
}

function FilterItems(filterValue: string): void {
  
    let Filtereditems: any[];
    const products = JSON.parse(localStorage.getItem("data")!) ?? [];
    if (filterValue == '' || filterValue == 'all') {
      Filtereditems = products;
    } else {
      Filtereditems = products.filter((product: { product_id: string }) => product.product_id == filterValue);
    }
    displayData1(Filtereditems);
  }
  

function searchProducts(): void {
  const search_val = (document.querySelector('#serachProductText') as HTMLInputElement).value;

  let sortedItem: any[] = [];
  const products = JSON.parse(localStorage.getItem("data")!) ?? [];
  const regex = new RegExp(search_val, "i")
  for (let element of products) {
    const item = element;
    if (regex.test(item.ProductName)) {
      sortedItem.push(element);
    }
  }

  displayData1(sortedItem);
}

const select = document.getElementById('hiddentproductid') as HTMLSelectElement;
document.querySelector('#filter-select-input')!.addEventListener('input', filterproduct)

function filterproduct(): void {
  const filterinput = document.querySelector('#filter-select-input') as HTMLInputElement;
  const filter = filterinput.value.toLowerCase();
  const listitem = document.querySelectorAll('.filter-select-input')

  listitem.forEach((item) => {
                 let text = item.textContent;
                 if (text!.toLowerCase().indexOf(filter.toLowerCase())) {
                   (item as HTMLElement).style.display = '';
                 } else {
                   (item as HTMLElement).style.display = 'none';
             }
               });
                 }



                 function sortItems(value: string): void {

                  let sortItems: Array<{product_id: number, ProductName: string, ProductPrice: number, Image: string, description: string}> = JSON.parse(localStorage.getItem("data")!) ?? [];
              
              
                  if (value === 'ProductName') {
              
                      sortItems = sortItems.sort((a, b) => a.ProductName.localeCompare(b.ProductName))
                  }
                  else if (value === 'ProductId') {
              
                      sortItems = sortItems.sort((a, b) => a.product_id - b.product_id)
              
                  }
                  else if (value === 'hl') {
                      sortItems = sortItems.sort((a, b) => b.ProductPrice - a.ProductPrice)
                  }
                  else {
                      sortItems = sortItems.sort((a, b) => a.ProductPrice - b.ProductPrice)
              
                  }
              
                  localStorage.setItem("data", JSON.stringify(sortItems));
              
                  displayData();
              }
              
              


// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget;
//   }
  
//   interface CompressedImage extends Blob {
//     name: string;
//   }
  
//   const NewDetail: HTMLFormElement = document.getElementById('addFormDetails') as HTMLFormElement;
  
//   const compressImageFunc = (image: any): Promise<CompressedImage> => {
//     return new Promise<CompressedImage>((resolve, reject) => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d")!;
  
//       const img = new Image();
//       img.onload = () => {
//         const MAX_WIDTH = 800;
//         const MAX_HEIGHT = 600;

//         let width = img.width;
//         let height = img.height;
  
//         if (width > height) {
//           if (width > MAX_WIDTH) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//           }
//         } else {
//           if (height > MAX_HEIGHT) {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//           }
//         }
  
//         canvas.width = width;
//         canvas.height = height;
  
//         ctx.drawImage(img, 0, 0, width, height);
  
//         canvas.toBlob((blob) => {
//           const compressedImage = blob as CompressedImage;
//           compressedImage.name = image.name;
//           resolve(compressedImage);
//         }, "image/jpeg", 0.7);
//       };
  
//       img.onerror = (error) => {
//         reject(error);
//       };
  
//       img.src = URL.createObjectURL(image);
//     });
//   };
  
//   const ImagetoBase64 = (file: File): Promise<string> => {
//     return new Promise<string>((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsArrayBuffer(file);
  
//       fileReader.onload = async () => {
//         const compressedImage = await compressImageFunc(new Blob([String(fileReader.result)], { type: file.type })) as File;
//         const compressedFileReader = new FileReader();
//         compressedFileReader.readAsDataURL(compressedImage);
  
//         compressedFileReader.onload = () => {
//           resolve(compressedFileReader.result as string);
//         };
  
//         compressedFileReader.onerror = (error) => {
//           reject(error);
//         };
//       };
  
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };
  

//   interface Product {
//     productId: number;
//     productName: string;
//     productPrice: number;
//     image: string;
//     description: string;
//   }
  
//   class ProductManager {
//     private static array: Product[] = [];
  
//     static readFormData = async () => {
//       let array = JSON.parse(localStorage.getItem("data")!) ?? [];
//       let formData: Product = {
//         productId: Math.floor(Math.random() * 1000),
//         productName: (document.getElementById("productName") as HTMLInputElement).value,
//         productPrice: parseFloat((document.getElementById("productPrice") as HTMLInputElement).value),
//         image: await ImagetoBase64((document.getElementById("Image") as HTMLFormElement).files[0]),

//         description: (document.getElementById("description") as HTMLInputElement).value,
//       };
  
//       this.array.push(formData);
//       localStorage.setItem("data", JSON.stringify(this.array));
//       this.displayData();
//       (document.querySelector("#closebtn") as HTMLElement).click();

//     };
  
//   static displayData = (): void => {
//       let obj: Product[] = JSON.parse(localStorage.getItem("data")!) ?? [];
//       let data = "";
//       let filterData = '<option class="text-dark" value="all">ALL</option>';
  
//       obj.forEach((product) => {
//         data += `
//           <div class="card m-2 col-lg-3 col-md-6 col-sm-12 col-8">
//             <img class="card-img-top mt-3" src="${product.image}" alt="Card image cap" style="width:100%; height:100%">
//             <div class="card-body">
//               <h5 class="card-title Card-text mt-3">${product.productName}</h5>
//               <p class="card-text Card-text mt-3"> ${product.productPrice}</p>
//               <p class="card-text Card-text">${product.description}</p>
//               <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#update-product-modal" onclick="updateProduct(${product.productId})">update</button>
//               <button class="btn-danger btn" onclick="deleteProduct(${product.productId})">Delete</button>
//             </div>
//           </div>
//         `;
  
//         filterData += `<option class="text-dark" value="${product.productId}">${product.productId}(${product.productName})</option>`;
//       });
  
//       document.getElementById("filter-select-input")!.innerHTML = filterData;
//       document.getElementById("products-display")!.innerHTML = data;
//     };
//   }
  
//   class ProductDisplay {
//     static displayData1(products): string {
//       let data = "";
//       products.forEach((product) => {
//         data += `
//           <div class="card m-2 col-lg-3 col-md-6 col-sm-12">
//             <div class="card-body">
//               <h5 class="card-title">${product.productName}</h5>
//               <p class="card-text">Price: ${product.productPrice}</p>
//             </div>
//           </div>
//         `;
//       });
//       return data;
//     }
//   }
  
//   function OnClose(): void {
//     NewDetail.reset();
//   }
  
//   function deleteProduct(productId: number): void {
//     let array: Product[] = JSON.parse(localStorage.getItem("data")!) ?? [];
//     array = array.filter((product) => productId !== product.productId);
//     localStorage.setItem("data", JSON.stringify(array));
//     ProductManager.displayData();
//   }
  
//   function updateProduct(productId: number): void {
//     let array: Product[] = JSON.parse(localStorage.getItem("data")!) ?? [];
//     const elem = array.find((product) => productId === product.productId);
  
//     if (elem) {
//       (document.getElementById("update-productName") as HTMLInputElement).value
  

//       interface productUpdate {
//         productId: number;
//         name: string;
//         price: number;
//         image: string;
//         description: string;
//       }
      
//       class ProductService {

//         static async updateData() {
          
       

//           const idInput = document.getElementById('hiddentproductid') as HTMLInputElement;
//           const id = idInput?.value;
      
//           const fileInput = document.getElementById('update-Image') as HTMLInputElement;
//           let imagess: string[] = [];
      
//           if (fileInput?.files && fileInput.files.length > 0) {
//             const file = fileInput.files[0];
//             const imageBase64 = await ImagetoBase64(file);
//             imagess.push(imageBase64);
//           }
      
//           let array: productUpdate[] = JSON.parse(localStorage.getItem('data')!) ?? [];
//           array = array.map((ele) => {
//             const formData: productUpdate = {
//               productId: ele.productId,
//               name: ele.name,
//               price: ele.price,
//               image: ele.image,
//               description: ele.description,
//             };
//             if (ele.productId === parseInt(id!)) {
//               if (imagess.length > 0) {
//                 formData.image = imagess[0];
//               }
//               formData.name = (document.getElementById('update-productName') as HTMLInputElement).value;
//               formData.price = parseInt((document.getElementById('update-productPrice') as HTMLInputElement).value);
//               formData.description = (document.getElementById('update-description') as HTMLInputElement).value;
//             }
//             return formData;
//           });
      
//           localStorage.setItem('data', JSON.stringify(array));
//           ProductManager.displayData();
//         }
      
//         static searchProducts() {
        
//           const search_val = (document.querySelector('#serachProductText') as HTMLInputElement).value;
      
//           let sortedItem: productUpdate[] = [];
//           let products: productUpdate[] = JSON.parse(localStorage.getItem('data')!) ?? [];
//           let regex = new RegExp(search_val, 'i');
//           for (let element of products) {
//             const item = element;
//             if (regex.test(item.name)) {
//               sortedItem.push(element);
//             }
//           }
//          ProductDisplay.displayData1(sortedItem)
         
//         }
      
//         static filterProduct() {
//           const filterinput = document.querySelector('#filter-select-input') as HTMLInputElement;
//           const filter = filterinput.value.toLowerCase();
//           const listitem = document.querySelectorAll('.filter-select-input');
//           listitem.forEach((item) => {
//             let text = item.textContent;
//             if (text!.toLowerCase().indexOf(filter.toLowerCase())) {
//               (item as HTMLElement).style.display = '';
//             } else {
//               (item as HTMLElement).style.display = 'none';
//             }
//           });
//         }
      
//         static sortItems(value: string) {
          
//           let sortItems: productUpdate[] = JSON.parse(localStorage.getItem('data')!) ?? [];
      
//           if (value === 'name') {
//             sortItems = sortItems.sort((a, b) => a.name.localeCompare(b.name));
//           } else if (value === 'productId') {
//             sortItems = sortItems.sort((a, b) => a.productId - b.productId);
//           } else if (value === 'hl') {
//             sortItems = sortItems.sort((a, b) => b.price - a.price);
//           } else {
//             sortItems = sortItems.sort((a, b) => a.price - b.price);
//           }
      
//           localStorage.setItem('data', JSON.stringify(sortItems));
//           ProductDisplay.displayData1(sortItems);
          
//         }
//       }
//     }
//   }