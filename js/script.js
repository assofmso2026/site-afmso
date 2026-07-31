/* =====================================================
   SITE OFFICIEL DE L'AFMS/O
   Fichier : js/script.js
===================================================== */


/* =====================================================
   1. ATTENDRE LE CHARGEMENT DE LA PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       2. FERMETURE DU MENU SUR TÉLÉPHONE
    ================================================= */

    const liensMenu = document.querySelectorAll(
        "#menuPrincipal .nav-link"
    );

    const menuMobile = document.querySelector(
        "#menuPrincipal"
    );


    liensMenu.forEach(function (lien) {

        lien.addEventListener("click", function () {

            /*
            Cette partie ferme automatiquement
            le menu après un clic sur téléphone.
            */

            if (
                menuMobile.classList.contains("show")
            ) {

                const menuBootstrap =
                    bootstrap.Collapse.getInstance(
                        menuMobile
                    );

                if (menuBootstrap) {

                    menuBootstrap.hide();

                }

            }

        });

    });


    /* =================================================
       3. ANIMATION DES ÉLÉMENTS AU DÉFILEMENT
    ================================================= */

    const elementsAnimes = document.querySelectorAll(

        ".action-card, " +
        ".contact-card, " +
        ".presentation-box, " +
        ".support-section"

    );


    /*
    L'observateur détecte le moment où
    un élément devient visible à l'écran.
    */

    const observateur = new IntersectionObserver(

        function (elements) {

            elements.forEach(function (element) {

                if (element.isIntersecting) {

                    element.target.classList.add(
                        "visible"
                    );

                    observateur.unobserve(
                        element.target
                    );

                }

            });

        },

        {

            threshold: 0.15

        }

    );


    /*
    Chaque élément reçoit la classe
    "animation-prete".
    */

    elementsAnimes.forEach(function (element) {

        element.classList.add(
            "animation-prete"
        );

        observateur.observe(element);

    });


    /* =================================================
       4. LIEN ACTIF DU MENU
    ================================================= */

    const pageActuelle = window.location.pathname
        .split("/")
        .pop();


    liensMenu.forEach(function (lien) {

        const lienPage = lien.getAttribute(
            "href"
        );


        /*
        On retire d'abord la classe active
        de tous les liens.
        */

        lien.classList.remove(
            "active"
        );


        /*
        On ajoute la classe active au lien
        correspondant à la page affichée.
        */

        if (
            lienPage === pageActuelle
        ) {

            lien.classList.add(
                "active"
            );

        }


        /*
        Si le navigateur ouvre directement
        le dossier du site, index.html
        est considéré comme la page active.
        */

        if (
            pageActuelle === "" &&
            lienPage === "index.html"
        ) {

            lien.classList.add(
                "active"
            );

        }

    });


    /* =================================================
       5. ANNÉE AUTOMATIQUE DANS LE PIED DE PAGE
    ================================================= */

    const anneeActuelle = new Date()
        .getFullYear();


    const zoneAnnee = document.querySelector(
        "#annee-actuelle"
    );


    if (zoneAnnee) {

        zoneAnnee.textContent =
            anneeActuelle;

    }


    /* =================================================
       6. MESSAGE DE CONTRÔLE DANS LA CONSOLE
    ================================================= */

    console.log(
        "AFMS/O : le site est correctement initialisé."
    );
/* =====================================================
   GALERIE : FILTRES ET AFFICHAGE DES PHOTOS
===================================================== */

const boutonsFiltreGalerie = document.querySelectorAll(
    ".gallery-filter"
);

const elementsGalerie = document.querySelectorAll(
    ".gallery-item"
);

const messageGalerieVide = document.querySelector(
    "#gallery-empty-message"
);


/* FILTRER LES PHOTOS */

boutonsFiltreGalerie.forEach(function (bouton) {

    bouton.addEventListener(
        "click",
        function () {

            const filtre = bouton.dataset.filter;

            let nombreVisible = 0;


            boutonsFiltreGalerie.forEach(
                function (autreBouton) {

                    autreBouton.classList.remove(
                        "active"
                    );

                }
            );


            bouton.classList.add(
                "active"
            );


            elementsGalerie.forEach(
                function (element) {

                    const categorie =
                        element.dataset.category;


                    if (
                        filtre === "all" ||
                        categorie === filtre
                    ) {

                        element.classList.remove(
                            "hidden"
                        );

                        nombreVisible++;

                    }

                    else {

                        element.classList.add(
                            "hidden"
                        );

                    }

                }
            );


            if (
                messageGalerieVide
            ) {

                if (
                    nombreVisible === 0
                ) {

                    messageGalerieVide.classList.add(
                        "visible"
                    );

                }

                else {

                    messageGalerieVide.classList.remove(
                        "visible"
                    );

                }

            }

        }
    );

});


/* OUVRIR UNE PHOTO */

const boutonsImagesGalerie =
    document.querySelectorAll(
        ".gallery-image-button"
    );


const galerieModal =
    document.querySelector(
        "#galleryModal"
    );


const imageModal =
    document.querySelector(
        "#galleryModalImage"
    );


const titreModal =
    document.querySelector(
        "#galleryModalTitle"
    );


const boutonFermerModal =
    document.querySelector(
        ".gallery-modal-close"
    );


boutonsImagesGalerie.forEach(
    function (bouton) {

        bouton.addEventListener(
            "click",
            function () {

                if (
                    !galerieModal
                ) {

                    return;

                }


                imageModal.src =
                    bouton.dataset.image;


                imageModal.alt =
                    bouton.dataset.title;


                titreModal.textContent =
                    bouton.dataset.title;


                galerieModal.classList.add(
                    "open"
                );


                galerieModal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


/* FERMER LA PHOTO */

function fermerGalerieModal() {

    if (
        !galerieModal
    ) {

        return;

    }


    galerieModal.classList.remove(
        "open"
    );


    galerieModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


if (
    boutonFermerModal
) {

    boutonFermerModal.addEventListener(
        "click",
        fermerGalerieModal
    );

}


/* FERMER EN CLIQUANT À L’EXTÉRIEUR */

if (
    galerieModal
) {

    galerieModal.addEventListener(
        "click",
        function (evenement) {

            if (
                evenement.target ===
                galerieModal
            ) {

                fermerGalerieModal();

            }

        }
    );

}


/* FERMER AVEC LA TOUCHE ÉCHAP */

document.addEventListener(
    "keydown",
    function (evenement) {

        if (
            evenement.key === "Escape"
        ) {

            fermerGalerieModal();

        }

    }
);

});

/* =====================================================
   FORMULAIRE DE CONTACT
===================================================== */

const formulaireContact = document.querySelector(
    "#contactForm"
);

const messageFormulaire = document.querySelector(
    "#contactFormMessage"
);


if (
    formulaireContact &&
    messageFormulaire
) {

    formulaireContact.addEventListener(
        "submit",
        function (evenement) {

            evenement.preventDefault();


            if (
                !formulaireContact.checkValidity()
            ) {

                messageFormulaire.textContent =

                    "Veuillez remplir correctement tous les champs.";


                messageFormulaire.className =

                    "contact-form-message visible error";


                formulaireContact.reportValidity();


                return;

            }


            messageFormulaire.textContent =

                "Votre message a été préparé. Pour l’instant, le formulaire ne l’envoie pas encore automatiquement. La prochaine étape sera de le relier à un service d’envoi sécurisé.";


            messageFormulaire.className =

                "contact-form-message visible success";


            formulaireContact.reset();

        }
    );

}

/* =====================================================
   BOUTON RETOUR EN HAUT
===================================================== */

const boutonRetourHaut = document.querySelector(
    "#backToTop"
);


if (
    boutonRetourHaut
) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 400
            ) {

                boutonRetourHaut.classList.add(
                    "visible"
                );

            }

            else {

                boutonRetourHaut.classList.remove(
                    "visible"
                );

            }

        }
    );


    boutonRetourHaut.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}

/* =====================================================
   ANIMATIONS AU DÉFILEMENT
===================================================== */

const elementsAnimes = document.querySelectorAll(

    ".reveal, .reveal-left, .reveal-right"

);


const observateurAnimations = new IntersectionObserver(

    function (
        elements
    ) {

        elements.forEach(

            function (
                element
            ) {

                if (
                    element.isIntersecting
                ) {

                    element.target.classList.add(

                        "visible"

                    );


                    observateurAnimations.unobserve(

                        element.target

                    );

                }

            }

        );

    },

    {

        threshold: 0.15

    }

);


elementsAnimes.forEach(

    function (
        element
    ) {

        observateurAnimations.observe(

            element

        );

    }

);

/* =====================================================
   OUTILS D’ACCESSIBILITÉ
===================================================== */

const boutonAccessibilite = document.querySelector(
    "#accessibilityToggle"
);

const panneauAccessibilite = document.querySelector(
    "#accessibilityPanel"
);

const boutonAugmenterTexte = document.querySelector(
    "#increaseText"
);

const boutonReduireTexte = document.querySelector(
    "#decreaseText"
);

const boutonReinitialiserTexte = document.querySelector(
    "#resetText"
);

const boutonContraste = document.querySelector(
    "#contrastToggle"
);


let tailleTexte = 100;


if (
    boutonAccessibilite &&
    panneauAccessibilite
) {

    boutonAccessibilite.addEventListener(
        "click",
        function () {

            panneauAccessibilite.classList.toggle(
                "open"
            );


            const panneauOuvert =

                panneauAccessibilite.classList.contains(
                    "open"
                );


            boutonAccessibilite.setAttribute(

                "aria-expanded",

                panneauOuvert

            );

        }
    );

}


if (
    boutonAugmenterTexte
) {

    boutonAugmenterTexte.addEventListener(
        "click",
        function () {

            if (
                tailleTexte < 130
            ) {

                tailleTexte += 10;

                document.documentElement.style.fontSize =

                    tailleTexte + "%";

            }

        }
    );

}


if (
    boutonReduireTexte
) {

    boutonReduireTexte.addEventListener(
        "click",
        function () {

            if (
                tailleTexte > 80
            ) {

                tailleTexte -= 10;

                document.documentElement.style.fontSize =

                    tailleTexte + "%";

            }

        }
    );

}


if (
    boutonReinitialiserTexte
) {

    boutonReinitialiserTexte.addEventListener(
        "click",
        function () {

            tailleTexte = 100;

            document.documentElement.style.fontSize =

                "100%";

        }
    );

}


if (
    boutonContraste
) {

    boutonContraste.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(

                "high-contrast"

            );

        }
    );

}

/* =====================================================
   FILTRES DES ACTUALITÉS
===================================================== */

const boutonsFiltres = document.querySelectorAll(

    ".filtre-actualite"

);


const articlesActualites = document.querySelectorAll(

    ".actualite-item"

);


const messageAucuneActualite = document.querySelector(

    "#aucuneActualite"

);


boutonsFiltres.forEach(

    function (
        bouton
    ) {

        bouton.addEventListener(

            "click",

            function () {


                const filtreChoisi =

                    bouton.dataset.filtre;


                boutonsFiltres.forEach(

                    function (
                        autreBouton
                    ) {

                        autreBouton.classList.remove(

                            "active"

                        );

                    }

                );


                bouton.classList.add(

                    "active"

                );


                let nombreVisible = 0;


                articlesActualites.forEach(

                    function (
                        article
                    ) {


                        const categorie =

                            article.dataset.categorie;


                        const afficher =

                            filtreChoisi === "toutes"

                            ||

                            categorie === filtreChoisi;


                        if (
                            afficher
                        ) {

                            article.classList.remove(

                                "hidden"

                            );


                            nombreVisible++;

                        }

                        else {

                            article.classList.add(

                                "hidden"

                            );

                        }


                    }

                );


                if (
                    messageAucuneActualite
                ) {

                    if (
                        nombreVisible === 0
                    ) {

                        messageAucuneActualite.classList.add(

                            "visible"

                        );

                    }

                    else {

                        messageAucuneActualite.classList.remove(

                            "visible"

                        );

                    }

                }


            }

        );

    }

);
