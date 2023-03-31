
    $(document).ready(function() {
        let angulo = 0;
        let girando = false;

        $("#form-imagen").on("submit", function(event) {
            event.preventDefault();
            let newName = randomCatBreed();
            
            $('<input>').attr({
                type: 'hidden',
                id: 'newImageName',
                name: 'newImageName',
                value: newName
            }).appendTo('#form-imagen');

            // Aquí se asigna el nuevo nombre antes de enviar el formulario
             var imagenNombre = $("#newImageName").val();
            console.log("Nuevo nombre de imagen:", imagenNombre);


            let formData = new FormData(this);
            $.ajax({
                url: "upload.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function() {
                  
                    
                },
                success: function(response) {
                    showMessage(response);
                
                    let inputImagen = $("#input-imagen")[0];
                        let reader = new FileReader();
                        reader.onload = function(e) {
                            let imagenURL = e.target.result;
                            let imagenExtension = inputImagen.files[0].name.split('.').pop();
                            let imagenNombre = nuevoNombreImagen + '.' + imagenExtension; // Usa nuevoNombreImagen
                            $("#imagen-giratoria").attr("src", imagenURL).show();
                            $("#boton-girar").show();

                            // Agrega la tarjeta con la imagen cargada y su nombre
                            let cardHTML = `
                                <div class="col-md-4 mt-4">
                                    <div class="card">
                                        <img src="${imagenURL}" class="card-img-top" alt="${imagenNombre}">
                                        <div class="card-body">
                                            <h5 class="card-title">${imagenNombre}</h5>
                                            <p class="card-text">Esta es una imagen cargada por el usuario.</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                            $("#imagenes-contenedor").append(cardHTML);
                        };
                    reader.readAsDataURL(inputImagen.files[0]);
                
                    // Elimina el campo oculto después de enviar el formulario
                    $("#newImageName").remove();
                },
                error: function() {
                    showMessage("Error al subir el archivo.");
                }
            });
        });

        $("#boton-girar").on("click", function() {
            girando = !girando;
            girarImagen();
        });

        function girarImagen() {
            if (girando) {
                angulo += 1;
                $("#imagen-giratoria").css("transform", "rotate(" + angulo + "deg)");
                setTimeout(girarImagen, 10);
            }
        }

        function showMessage(message) {
            $("#messageModal .modal-body").html(message);
            $("#messageModal").modal("show");
        }

        function randomCatBreed() {
            const breeds = [
                "Abyssinian",
                "Bengal",
                "Birman",
                "Bombay",
                "British Shorthair",
                "Burmese",
                "Egyptian Mau",
                "Maine Coon",
                "Norwegian Forest",
                "Oriental Shorthair",
                "Persian",
                "Ragdoll",
                "Russian Blue",
                "Scottish Fold",
                "Siamese",
                "Siberian",
                "Sphynx",
                "Tonkinese",
                "Turkish Angora",
                "Turkish Van"
            ];
        
            return breeds[Math.floor(Math.random() * breeds.length)];
        }
        
    });
