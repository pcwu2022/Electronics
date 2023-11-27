const BJT = (
    VT = 25E-3, 
    IS = 1E-15, 
    VDD = 0.6, 
    RC = 0.1E3, 
    VBEMax = 0.8, 
    VCEMax = 0.8,
    Step = 0.05
) => {

// // BJT parameters
// const VT = 25E-3;
// const IS = 1E-15;

// // load line parameters
// const VDD = 0.6
// const RC = 0.1E3

// // display parameters
// const VBEMax = 0.8;
// const VCEMax = 0.8;
// const Step = 0.05;

let iC = [];
let x = [];
let y = [];
let load = [];
for (let i = 0; i < VBEMax/Step; i++){
    iC.push([]);
    x.push([]);
    y.push([]);
    load.push([]);
    for (let j = 0; j < VCEMax/Step; j++){
        iC[i].push(0);
        let vbe = i*Step;
        let vce = j*Step;
        x[i].push(vbe);
        y[i].push(vce);
        if (vce < 0.2){
            iC[i][j] = IS*Math.exp(vbe/VT)*[1-(vce-0.2)**2/0.04]
        } else {
            iC[i][j] = IS*Math.exp(vbe/VT);
        }
        load[i].push((VDD - vce)/RC);
    }
}

console.log(iC);

let bjtData = {
    x: x, 
    y: y, 
    z: iC, 
    type: 
    'surface', 
    name: 'MOSFET',
    opacity: 0.7
};

let loadData = {
    x: x, 
    y: y, 
    z: load, 
    type: 'surface', 
    name: 'MOSFET'
};

let layout = {
    title: {
        text: "BJT"
    },
    xaxis: {
        title: {
            text: "VBE"
        }
    },
    yaxis: {
        title: {
            text: "VCE"
        }
    }
};

Plotly.newPlot('bjt', [bjtData, loadData], layout);

}