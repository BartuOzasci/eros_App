/**
 * "Hızlı kayıt" butonunun düzenleme için açacağı GitHub deposu.
 * Depo adı veya ana dal değişirse yalnızca burayı güncellemek yeterli.
 */
export const githubRepo = {
  owner: "BartuOzasci",
  name: "eros_App",
  branch: "main",
};

/** Depodaki bir dosyanın GitHub web düzenleyicisindeki adresi. */
export const githubEditUrl = (filePath) =>
  `https://github.com/${githubRepo.owner}/${githubRepo.name}/edit/${githubRepo.branch}/${filePath}`;
