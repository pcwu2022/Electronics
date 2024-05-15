const MOSFET = (
    Vt = 0.5,
    kn = 4E-3,
    VDD = 1.8,
    kpkn = 1,
    RD = 1E3,
    mode = "CS",
    VGSMax = 2,
    VDSMax = 2,
    Step = 0.05,
) => {

    let kp = kpkn * kn;

    let iD = [];
    let x = [];
    let y = [];
    let load = [];
    for (let i = 0; i < VGSMax/Step; i++){
        iD.push([]);
        x.push([]);
        y.push([]);
        load.push([]);
        for (let j = 0; j < VDSMax/Step; j++){
            iD[i].push(0);
            let vgs = i*Step;
            let vds = j*Step;
            x[i].push(vgs);
            y[i].push(vds);
            let vov = vgs - Vt;
            if (vov < 0){
                iD[i][j] = 0;
            } else if (vds < vov){
                iD[i][j] = kn*(vov*vds - 0.5*vds*vds);
            } else {
                iD[i][j] = 0.5*kn*vov*vov;
            }

            if (mode === "PMOS"){
                // Load line: PMOS of pseudo-NMOS
                let vovp = VDD - vgs - Vt;
                let vdsp = VDD - vds;
                if (vovp < 0){
                    load[i][j] = 0;
                } else if (vdsp < vovp){
                    load[i][j] = kp*(vovp*vdsp - 0.5*vdsp*vdsp);
                } else {
                    load[i][j] = 0.5*kp*vovp*vovp;
                }
            } else if (mode === "CMOS"){
                // Load line: PMOS of CMOS
                let vovp = VDD - vgs - Vt;
                let vdsp = VDD - vds;
                if (vovp < 0){
                    load[i][j] = 0;
                } else if (vdsp < vovp){
                    load[i][j] = kp*(vovp*vdsp - 0.5*vdsp*vdsp);
                } else {
                    load[i][j] = 0.5*kp*vovp*vovp;
                }
            } else {
                // CS Amplifier
                load[i].push((VDD - vds)/RD);
            }
        }
    }

    console.log(iD);

    let mosfetData = {
        x: x, 
        y: y, 
        z: iD, 
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
            text: "MOSFET"
        },
        xaxis: {
            title: {
                text: "VGS"
            }
        },
        yaxis: {
            title: {
                text: "VDS"
            }
        }
    };

    Plotly.newPlot('mosfet', [mosfetData, loadData], layout);

};