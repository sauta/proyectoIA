
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

            uploadImage()
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

    function uploadImage() {
        var formData = new FormData();
        formData.append("image", fileInput.files[0]);
    
        $.ajax({
            url: "http://localhost:8000/api/images",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#uploadSuccessModal').modal('show');
                $('.card-img-top').attr('src', 'http://localhost:8000/uploads/' + response.filename);
                $('.card-title').text(response.filename);
            },
            error: function () {
                $('#uploadErrorModal').modal('show');
            },
        });
    }
