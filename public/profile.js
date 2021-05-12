// $(document).ready(function () {
//     profileView();
//   });
//   function profileView() {
//     $.ajax({
//       type: "GET",
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       url: `/profile`,
//       data: {},
//       success: function (response) {
//         console.log(response["profile"]);
//       },
//     });
//   }

function nicknameUpload(e) {
  console.dir(e);

  e.preventDefault();

  const nickname = document.querySelector("form input[name=nickname]").value;
  const profileImage = document.querySelector("form input[name=profileImage]")
    .files[0];

  let formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("profileImage", profileImage, profileImage.name);

  $.ajax({
    processData: false,
    contentType: false,
    type: "PATCH",
    url: `/action`,
    enctype: "multipart/form-data",
    // headers: {
    //   authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
    data: formData,
    success: function (response) {
      if (response["result"] == "success") {
        window.location.href = "/board";
      }
    },
  });
}
