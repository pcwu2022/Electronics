const gebi = (id) => document.getElementById(id);
const val = (id) => gebi(id).value;
const show = (id, tf = true) => gebi(id).style.display = tf?"block":"none";

let mode = "CS";

show("kpkn_wrapper", false);

gebi("run").addEventListener("click", () => {
    console.log("YA");
    MOSFET(val("Vt"), val("kn"), val("VDDM"), val("kpkn"), val("RD"), mode);
    BJT(val("VT"), val("IS"), val("VDDB"), val("RC"));
    show("run", false);
});

gebi("switch_NMOS").addEventListener("click", () => {
    show("button_wrapper", false);
    show("RD_wrapper", false);
    show("kpkn_wrapper", true);
    gebi("mos_img").src = "https://www.webpagescreenshot.info/image-url/JfO5XD32f";
    mode = "NMOS";
});

gebi("switch_CMOS").addEventListener("click", () => {
    show("button_wrapper", false);
    show("RD_wrapper", false);
    show("kpkn_wrapper", true);
    gebi("mos_img").src = "https://www.webpagescreenshot.info/image-url/54gp4j-lH";
    mode = "CMOS";
});