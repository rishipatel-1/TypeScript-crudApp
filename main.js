var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Details = /** @class */ (function () {
    function Details() {
        var _this = this;
        this.handleSubmit = function (event) {
            event.preventDefault();
        };
        this.handleFileChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var fileInput, files, file, image, _a, details_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileInput = event.target;
                        files = fileInput.files;
                        if (!files || files.length === 0) {
                            return [2 /*return*/];
                        }
                        file = files[0];
                        image = {
                            name: file.name,
                            type: file.type,
                            size: file.size
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = image;
                        return [4 /*yield*/, this.imageToBase64(file)];
                    case 2:
                        _a.dataUrl = _b.sent();
                        console.log(image);
                        details_1 = new Details();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.compressImage = function (image) {
            return new Promise(function (resolve, reject) {
                if (!image) {
                    reject('Image is null or undefined');
                    return;
                }
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var img = new Image();
                img.onload = function () {
                    var MAX_WIDTH = 800;
                    var MAX_HEIGHT = 600;
                    var width = img.width;
                    var height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    }
                    else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(function (blob) {
                        resolve(blob);
                    }, 'image/jpeg', 0.7);
                };
                img.onerror = function (error) {
                    reject(error);
                };
                img.src = URL.createObjectURL(image);
            });
        };
        this.imageToBase64 = function (file) {
            return new Promise(function (resolve, reject) {
                var fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                    var compressedImage, compressedFileReader_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(fileReader.result !== null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.compressImage(new Blob([fileReader.result], { type: file.type }))];
                            case 1:
                                compressedImage = _a.sent();
                                compressedFileReader_1 = new FileReader();
                                compressedFileReader_1.readAsDataURL(compressedImage);
                                compressedFileReader_1.onload = function () {
                                    resolve(compressedFileReader_1.result);
                                };
                                compressedFileReader_1.onerror = function (error) {
                                    reject(error);
                                };
                                return [3 /*break*/, 3];
                            case 2:
                                reject(new Error('Failed to read file'));
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                fileReader.onerror = function (error) {
                    reject(error);
                };
            });
        };
        this.form = document.getElementById('addFormDetails');
        this.input = this.form.querySelector('input[type="file"]');
        this.form.addEventListener('submit', this.handleSubmit);
        this.input.addEventListener('change', this.handleFileChange);
    }
    Details.prototype.reset = function () {
        this.form.reset();
    };
    return Details;
}());
var details = new Details();
function readFormData() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var array, formData, stringFile;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
                    formData = {};
                    formData.product_id = Math.floor(Math.random() * 1000);
                    formData.ProductName = document.getElementById('productName').value;
                    formData.ProductPrice = document.getElementById('productPrice').value;
                    return [4 /*yield*/, details.imageToBase64(document.getElementById('Image').files[0])];
                case 1:
                    stringFile = _b.sent();
                    formData.Image = stringFile;
                    formData.description = document.getElementById('description').value;
                    array.push(formData);
                    localStorage.setItem("data", JSON.stringify(array));
                    displayData();
                    document.querySelector("#closebtn").click();
                    return [2 /*return*/];
            }
        });
    });
}
window.onload = displayData;
function displayData() {
    var _a;
    var obj = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
    var data = '';
    var filterData = '<option class="text-dark" value="all">ALL</option>';
    obj.forEach(function (product) {
        data += " <div class=\"card m-2 col-lg-3 col-md-6 col-sm-12 col-8\" >\n      <img class=\"card-img-top mt-3\"\" src=\"".concat(product.Image, "\" alt=\"Card image cap\" style=\"width:100%; height:100%\" >\n      <div class=\"card-body\">\n        <h5 class=\"card-title Card-text mt-3\">").concat(product.ProductName, "</h5>\n        <p class=\"card-text Card-text mt-3\"> ").concat(product.ProductPrice, "</p>\n        <p class=\"card-text Card-text\">").concat(product.description, "</p>\n        <button type=\"button\" class=\"btn btn-success\" data-bs-toggle=\"modal\" data-bs-target=\"#update-product-modal\" onclick=\"updateProduct(").concat(product.product_id, ")\">update </button>\n        <button class=\"btn-danger btn \" onclick=\"deleteProduct(").concat(product.product_id, ")\">Delete</button>\n      </div>\n    </div>");
        filterData += "<option class=\"text-dark\" value=\"".concat(product.product_id, "\">").concat(product.product_id, "(").concat(product.ProductName, ")</option>");
    });
    document.getElementById('filter-select-input').innerHTML = filterData;
    document.getElementById('products-display').innerHTML = data;
}
function displayData1(products) {
    var obj = products;
    var data = '';
    obj.forEach(function (product) {
        data += " <div class=\"card m-2 col-lg-3 col-md-6 col-sm-12 col-8\">\n      <img class=\"card-img-top mt-3\"\" src=\"".concat(product.Image, "\" alt=\"Card image cap \">\n      <div class=\"card-body\">\n        <h5 class=\"card-title Card-text\">").concat(product.ProductName, "</h5>\n        <p class=\"card-text Card-text\">").concat(product.ProductPrice, "</p>\n        <p class=\"card-text Card-text\">").concat(product.description, "</p>\n        <button type=\"button\" class=\"btn btn-success\" data-bs-toggle=\"modal\" data-bs-target=\"#update-product-modal\" onclick=\"updateProduct(").concat(product.product_id, ")\">update </button>\n        <button class=\"btn-danger btn \" onclick=\"deleteProduct(").concat(product.product_id, ")\">Delete</button>\n      </div>\n    </div>");
    });
    document.getElementById('products-display').innerHTML = data;
}
function OnClose() {
    details.reset();
}
function deleteProduct(indx) {
    var _a;
    var array = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
    array = array.filter(function (ele) { return indx !== ele.product_id; });
    localStorage.setItem("data", JSON.stringify(array));
    displayData();
}
function updateProduct(pid) {
    var _a;
    var array = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
    var elem = array.filter(function (ele) { return pid === ele.product_id; });
    document.getElementById("update-productName").value = elem[0].ProductName;
    document.getElementById("update-productPrice").value = elem[0].ProductPrice;
    document.getElementById('update-description').value = elem[0].description;
    document.getElementById('hiddentproductid').value = elem[0].product_id;
}
function updateData() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var id, imagess, array;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = document.getElementById('hiddentproductid').value;
                    imagess = null;
                    console.log(document.getElementById('update-Image').files[0]);
                    if (!document.getElementById('update-Image').files[0]) return [3 /*break*/, 2];
                    return [4 /*yield*/, details.imageToBase64(document.getElementById('update-Image').files[0])];
                case 1:
                    imagess = _b.sent();
                    console.log(imagess);
                    _b.label = 2;
                case 2:
                    array = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
                    array = array.map(function (ele) {
                        var formData = {};
                        if (ele.product_id === parseInt(id)) {
                            if (imagess !== null) {
                                ele.Image = imagess;
                            }
                            ele.ProductName = document.getElementById('update-productName').value;
                            ele.ProductPrice = document.getElementById('update-productPrice').value;
                            ele.description = document.getElementById('update-description').value;
                        }
                        return ele;
                    });
                    localStorage.setItem("data", JSON.stringify(array));
                    displayData();
                    document.querySelector("#closebtn2").click();
                    return [2 /*return*/];
            }
        });
    });
}
function FilterItems(filterValue) {
    var _a;
    var Filtereditems;
    var products = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
    if (filterValue == '' || filterValue == 'all') {
        Filtereditems = products;
    }
    else {
        Filtereditems = products.filter(function (product) { return product.product_id == filterValue; });
    }
    displayData1(Filtereditems);
}
function searchProducts() {
    var _a;
    var search_val = document.querySelector('#serachProductText').value;
    var sortedItem = [];
    var products = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
    var regex = new RegExp(search_val, "i");
    for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
        var element = products_1[_i];
        var item = element;
        if (regex.test(item.ProductName)) {
            sortedItem.push(element);
        }
    }
    displayData1(sortedItem);
}
var select = document.getElementById('hiddentproductid');
document.querySelector('#filter-select-input').addEventListener('input', filterproduct);
function filterproduct() {
    var filterinput = document.querySelector('#filter-select-input');
    var filter = filterinput.value.toLowerCase();
    var listitem = document.querySelectorAll('.filter-select-input');
    listitem.forEach(function (item) {
        var text = item.textContent;
        if (text.toLowerCase().indexOf(filter.toLowerCase())) {
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    });
}
function sortItems(value) {
    var _a;
    var sortItems = (_a = JSON.parse(localStorage.getItem("data"))) !== null && _a !== void 0 ? _a : [];
    if (value === 'ProductName') {
        sortItems = sortItems.sort(function (a, b) { return a.ProductName.localeCompare(b.ProductName); });
    }
    else if (value === 'ProductId') {
        sortItems = sortItems.sort(function (a, b) { return a.product_id - b.product_id; });
    }
    else if (value === 'hl') {
        sortItems = sortItems.sort(function (a, b) { return b.ProductPrice - a.ProductPrice; });
    }
    else {
        sortItems = sortItems.sort(function (a, b) { return a.ProductPrice - b.ProductPrice; });
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
