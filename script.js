const gebi = (id) => document.getElementById(id);
const val = (id) => gebi(id).value;

gebi("run").addEventListener("click", () => {
    console.log("YA");
    MOSFET(val("Vt"), val("kn"), val("VDDM"), val("kpkn"));
    BJT(val("VT"), val("IS"), val("VDDB"), val("RC"));
    gebi("run").style.display = "none";
});