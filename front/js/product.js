const id = getDataFromUrl ("id");

//Récupération du canapé correspondant à l'URL en json
fetch("http://localhost:3000/api/products/" + id) 
.then((res) => res.json())
.then((product) => 
{
    display(product);
    listenForCartAddition(product);
})

//Affichage du produit sur la page en fonction du code html
function display(product){
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    //boucle for pour allé chercher dans l'API toutes les couleurs disponible
    for (let color of product.colors) {
            document.getElementById("colors").innerHTML += `<option value=${color}>${color}</option>`
    }  
}  
//Récuperation de l'id de chaque produit individuellement
function getDataFromUrl(key){
    let params = new URLSearchParams(document.location.search);
    return params.get(key);
    
} 


//Importation de tous les elements de l'article au clic ()
function listenForCartAddition(){
    //Ecouter le bouton "ajouter" au produit et selection de ce dernier au clic
    document.getElementById("addToCart").addEventListener("click", function (event) {
        event.preventDefault();
        // création des variables de qantité et de couleur
        let qty = document.getElementById("quantity").value;
        let color = document.getElementById("colors").value;
        //création des messages d'alerte pour l'utilisateur
        if (qty < 1){
            alert("veuillez séléctionner une quantité");
            return;
        }
        if (color.length < 1){
            alert("veuillez séléctionner une couleur");
            return;
        }

        //si les produits existent dans le local storage les prendre
        let existInLocalStorage = !!localStorage.getItem("products");

        //mise au format json
        if (existInLocalStorage){
            let items = JSON.parse(localStorage.getItem("products"));

            let product = items.find(product =>{
                return product.id === id && product.color === color;
            })

            //si le produits sont dans le storage les additionner
            if (!!product)
            {
                product.qty = parseInt(product.qty) + parseInt(qty)
                localStorage.setItem("products", JSON.stringify(items));
            }

            //si non créer un nouvel item avec l'id la couleur et la qty
            else{
                let newItem = {
                    id: id,
                    color: color,
                    qty: qty
                };

                items.push(newItem)
                localStorage.setItem("products", JSON.stringify(items));
                alert("l'article a bien été ajouté au panier");
                return;
            }
                
        }

        else {
            let items = [];

            let newItem = {
                id: id,
                color: color,
                qty: qty
            };

            items.push(newItem)
            localStorage.setItem("products", JSON.stringify(items)); 
            alert("l'article a bien été ajouté au panier");
                return;
        }
    })
} 
 
    