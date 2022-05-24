const productWrapper = document.querySelector(".product-wrapper");

const createElement = function(tagName, className, text) {
    const createdElement = tagName;
    createdElement.className = className;

    if (text) {
        createdElement.textContent = text;
    }
    return createdElement;
};

const productTemplate = document.querySelector("#product-template");

const createProduct = function(product) {
    const { id, title, img, price, birthDate, isFavorite, features } = product;

    const elProductRow = productTemplate.cloneNode(true).content;
    const elProductitle = elProductRow.querySelector(".card-title");
    elProductitle.textContent = title;
    const elProductImg = elProductRow.querySelector(".card-img-top");
    elProductImg.src = img;
    const elPorductPrice = elProductRow.querySelector("mark");
    elPorductPrice.textContent = `$${price}`;
    const elProductSize = elProductRow.querySelector(".bg-success");
    elProductSize.textContent = `${product.sizes.width}sm x ${product.sizes.height}sm`;
    const elPorductData = elProductRow.querySelector(".product-data");
    elPorductData.textContent = birthDate;
    const elProductItem = elProductRow.querySelector(".bg-primary");
    elProductItem.textContent = features;

    // for (let i = 0; i < product.features.length; i++) {
    //     const elProductLi = createElement("li", "badge bg-primary me-1 mb-1", features[i])
    //     elProductItem.append(elProductLi)
    // }
    const elProductFavoriteBtn = elProductRow.querySelector(".btn-success");
    elProductFavoriteBtn.dataset.id = id;
    const elProductEditBtn = elProductRow.querySelector(".btn-secondary");
    elProductEditBtn.dataset.id = id;
    const elProductDeleteBtn = elProductRow.querySelector(".btn-danger");
    elProductDeleteBtn.dataset.id = id;
    const elProductFavorites = elProductRow.querySelector(".btn-success");
    elProductFavorites.textContent = isFavorite;

    return elProductRow;
};

const elPorductCount = document.querySelector("#product-count");

const productRender = function(productArray = products) {
    elPorductCount.textContent = `Count: ${productArray.length}`;

    productArray.forEach(function(product) {
        const elProduct = createProduct(product) ;
            productWrapper.append(elProduct);
    });
};
    const elPorductForm = document.querySelector("#add-form")
    const elProductAddTitle = document.querySelector("#add-parrot-title");
    const elProductAddImg = document.querySelector("#add-parrot-img");
    const elProductAddPrice = document.querySelector("#add-price");
    const elProductAddData = document.querySelector("#add-parrot-date");
    const elPorductAddWidth = document.querySelector("#add-parrot_width");
    const elProductAddHeight = document.querySelector("#add-parrot_height");
    const elProductAddFeatures = document.querySelector("#add-features");
    const elAddModal = new bootstrap.Modal(document.querySelector("#add-parrot-modal"));

productRender();

elPorductForm.addEventListener("submit", function(evt) {
evt.preventDefault();

const titleValue = elProductAddTitle.value;
const imgValue = elProductAddImg.value;
const priceValue = elProductAddPrice.value;
const dataValue = elProductAddData.value;
const widthValue = elPorductAddWidth.value;
const heightValue =  elProductAddHeight.value;
const featuresValue = elProductAddFeatures.value;

if (titleValue && imgValue && priceValue && dataValue && widthValue && heightValue && featuresValue) {
    const addProduct = {
        id: Math.floor(Math.random() * 1000),
        title: titleValue,
        img: "https://media.istockphoto.com/photos/parrot-hyacinth-macaw-picture-id1359443019?b=1&k=20&m=1359443019&s=170667a&w=0&h=dteRZ9bM7sEvBbFE9it1r9O7IxlILXb1UnSoLNEVMAg=",
        price: priceValue,
        sizes: {
            width: widthValue,
            height: heightValue,
        },
        features: featuresValue.split(",")
    };
    console.log(addProduct);

    products.unshift(addProduct);
    const productW = createProduct(addProduct);
    productWrapper.append(productW);
    elAddModal.hide();
    elPorductForm.reset();
}

});

const elProductEditTitle = document.querySelector("#edit-parrot-title");
const elProductEditImg = document.querySelector("#edit-parrot-img");
const elProductEditPrice = document.querySelector("#edit-price");
const elProductEditData = document.querySelector("#edit-parrot-date");
const elPorductEditWidth = document.querySelector("#edit-parrot_width");
const elProductEditHeight = document.querySelector("#edit-parrot_height");
const elProductEditFeatures = document.querySelector("#edit-features");
const elProductEditForm = document.querySelector("#edit-form");
const elEditModal = new bootstrap.Modal(document.querySelector("#edit-parrot-modal"));

productWrapper.addEventListener("click", function(evt) {
    if(evt.target.matches(".btn-danger")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnIndex = products.findIndex(function(product) {
            return product.id === clickedBtnId;
        });

        products.splice(clickedBtnIndex, 1);
        productWrapper.innerHTML = "";
        productRender();
    }

    if (evt.target.matches(".btn-secondary")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnElement = products.find(function(product) {
            return product.id === clickedBtnId;
        });
        elProductEditTitle.value = clickedBtnElement.title;
        elProductEditImg.value = clickedBtnElement.img;
        elProductEditPrice.value = clickedBtnElement.price;
        elProductEditData.value = clickedBtnElement.birthDate;
        elPorductEditWidth.value = clickedBtnElement.width;
        elProductEditHeight.value = clickedBtnElement.height;

        elProductEditForm.dataset.id = clickedBtnId;
    }
});

elProductEditForm.addEventListener("submit", function(evt) {
evt.preventDefault();

const productTitle = elProductEditTitle.value;
const productImg = elProductEditImg.value;
const productPrice = elProductEditPrice.value;
const productData = elProductEditData.value;
const productWidth = elPorductEditWidth.value;
const productHeight = elProductEditHeight.value;
const productFeatures = elProductEditFeatures.value;

if (productTitle && productImg && productPrice && productData && productWidth && productHeight) {
    const elProductEditing = {
        id: evt.target.dataset.id,
        title: elProductEditTitle.value,
        img: "https://media.istockphoto.com/photos/parrot-hyacinth-macaw-picture-id1359443019?b=1&k=20&m=1359443019&s=170667a&w=0&h=dteRZ9bM7sEvBbFE9it1r9O7IxlILXb1UnSoLNEVMAg=",
        price: elProductEditPrice.value,
        birthDate: elProductEditData.value,
        sizes: {
        width: elPorductEditWidth.value,
        height: elProductEditHeight.value,
        },
        features: elProductEditFeatures.value.split(",")
    };
    const productIndex = products.findIndex(function(product) {
        return elProductEditing.id === product.id;
    });

    products.splice(productIndex, 1, elProductEditing);
    productWrapper.innerHTML = "";
    productRender();
    elEditModal.hide();
}
});

// for sortBy

const elProductFilterForm = document.querySelector("#product-filter");
const elProductFilterSearch = document.querySelector("#search");
const elProductFIlterFrom = document.querySelector("#from");
const elProductFilterTo = document.querySelector("#to");
const elProductFilterWith = document.querySelector("#from_width");
const elProductFilterTowidth = document.querySelector("#to_width");
const elProductFilterHeight = document.querySelector("#from_height");
const elProductFilterToheight = document.querySelector("#to_height");
const elProductFilterSortby = document.querySelector("#sortby");

elProductFilterForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    const filterSearchValue = elProductFilterSearch.value;
    const filterFromValue = elProductFIlterFrom.value;
    const filterToValue = elProductFilterTo.value;
    const filterFromWithValue = elProductFilterWith.value;
    const filterToWithValue = elProductFilterTowidth.value;
    const filterFromHeightValue = elProductFilterHeight.value;
    const filterToHeightValue = elProductFilterToheight.value;
    const filterSortBy = elProductFilterSortby.value; 

    let productFilter = products.filter(function(product) {
        return product.title.toLowerCase().includes(filterSearchValue.toLowerCase())
    }).filter(function(product) {
            return product.price >= filterFromValue;
    }).filter(function(product) {
        if (filterToValue) {
            return product.price <= filterToValue;
        }
        return true
    }).filter(function(product) {
        return product.sizes.width >= filterFromWithValue;
    }).filter(function(product) {
        if(filterToWithValue) {
            return product.sizes.width <= filterToWithValue;
        }
        return true
    }).filter(function(product) {
        return product.sizes.height >= filterFromHeightValue;
    }).filter(function(product) {
        if (filterToHeightValue) {
            return product.sizes.height <= filterToHeightValue;
        }
        return true
    }).sort(function(a, b) {
        switch (filterSortBy) {
            case "1":
                if (a.title > b.title) {
                    return 1
                } else if (a.title < b.title) {
                    return-1
                }
                return 0;
                case "2":
                  return  a.price - b.price;
                case "3":
                 return   b.price - a.price;
                case "4":
                 return   a.sizes.width - b.sizes.width;
                case "5":
                 return   b.sizes.width - a.sizes.width;
            default:
                return true
        }
    })
    console.log(filterSortBy);

    productWrapper.innerHTML = "";
    productRender(productFilter)
})
