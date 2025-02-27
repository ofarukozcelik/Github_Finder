import { Github } from "./scripts/api.js";
import { elements } from "./scripts/helpers.js";
import { UI } from "./scripts/ui.js";

//Github classı miras alma
const github = new Github();

// UI classın örneği
const ui = new UI();
github.fetchUserData();
const getInput = (e) => {
  e.preventDefault();
  const value = elements.searchInput.value;
  if (value == "") {
    ui.showAlert("Form alanını doldurunuz.", "alert alert-warning");
    return;
  }
  if (value) {
    github
      .fetchUserData(value)
      .then((res) => {
        // Eğer kullanıcı bulunamadıysa
        if (res.message === "Not Found") {
          ui.showAlert(
            "Aradığınız kullanıcı bulunamadı.",
            "alert alert-danger"
          );
        } else {
          // Kullanıcı bulunduysa
          ui.showAlert("Kullanıcı bulundu.", "alert alert-success");
          ui.renderProfile(res.data);
          console.log(res);
          ui.renderProjects(res.repos);
        }
      })
      .catch((err) => console.log(err));
    return;
  }
};

// Olay İzleyici
elements.searchBtn.addEventListener("click", getInput);
