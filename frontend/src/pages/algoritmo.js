import React, { useState } from "react";
import Navbar from "../components/navbar";

const Algoritmo = () => {

    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")
    const [result, setResult] = useState("")

    const calculateMissing = () => {
        const A = parseFloat(a);
        const B = parseFloat(b);
        const C = parseFloat(c);

        try {
            if (!isNaN(A) && !isNaN(B) && isNaN(C)) {
                const calcC = Math.sqrt(A ** 2 + B ** 2);
                setC(calcC.toFixed(2));
                setResult(`C es igual a ${calcC.toFixed(2)}`);
            } else if (!isNaN(A) && isNaN(B) && !isNaN(C)) {
                if (C ** 2 < A ** 2) {
                    throw new Error("Raíz negativa: C² debe ser mayor o igual a A²");
                }
                const calcB = Math.sqrt(C ** 2 - A ** 2);
                setB(calcB.toFixed(2));
                setResult(`B es igual a ${calcB.toFixed(2)}`);
            } else if (isNaN(A) && !isNaN(B) && !isNaN(C)) {
                if (C ** 2 < B ** 2) {
                    throw new Error("Raíz negativa: C² debe ser mayor o igual a B²");
                }
                const calcA = Math.sqrt(C ** 2 - B ** 2);
                setA(calcA.toFixed(2));
                setResult(`A es igual a ${calcA.toFixed(2)}`);
            } else {
                setResult("Por favor, ingresa exactamente dos valores para resolver el tercero.");
            }
        } catch (error) {
            setResult(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4 col-sm-4">
                <div className="card border rounded shadow-lg bg-light p-4">
                    <h3 className="card-title">Algoritmo</h3>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Valor de A: </label>
                            <input className="form-control" type="number" value={a} placeholder="Ingresa A" onChange={(e) => setA(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor de B: </label>
                            <input className="form-control" type="number" value={b} placeholder="Ingresa B" onChange={(e) => setB(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor de c: </label>
                            <input className="form-control" type="number" value={c} placeholder="Ingresa C" onChange={(e) => setC(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={calculateMissing}>Resolver</button>
                    </div>
                    {result && <div className="mt-3 alert alert-info">{result}</div>}
                </div>
            </div>
        </>
    )
}
export default Algoritmo;