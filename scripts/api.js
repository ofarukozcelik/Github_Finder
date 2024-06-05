export class Github {
  constructor() {
    this.client_id = "Ov23liv773K0nOfwyvbz";
    this.client_secret = "16800fd39aa79a2136cd6b04d9bc550e3afe30ce";
    this.per_page = 10;
    this.sort = "asc";
  }
  // Api'den kullanıcı bilgileri alma
  async fetchUserData(username) {
    // Parametre olarak gelen kullanıcı adına göre istek atma
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    // Kullanıcı repolarını almak için istek atma
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?cliend_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.per_page}&sort=${this.sort}`
    );

    // Apiden aldığımız cevabı json yapısına çevirdik
    const data = await profileRes.json();
    const repos = await repoRes.json();
    
    // Fonksiyonun çağrıldığı yere bilgileri gönderme
    return { data, repos };
  }
}
