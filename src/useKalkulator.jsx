import { useState } from 'react';

export function useKalkulator(initialA = null, initialB = null) {
    const [liczbaA, setLiczbaA] = useState(initialA);
    const [liczbaB, setLiczbaB] = useState(initialB);
    const [wynik, setWynik] = useState(null);
    const [historia, setHistoria] = useState([]);

    const parsujLiczbe = (value) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    }

    const liczbaAOnChange = (value) => setLiczbaA(parsujLiczbe(value));
    const liczbaBOnChange = (value) => setLiczbaB(parsujLiczbe(value));

    const aktualizujHistorie = (operation, wynik) => {
        const nowaHistoria = [...historia, { a: liczbaA, b: liczbaB, operation, wynik }];
        setHistoria(nowaHistoria);
        setWynik(wynik);
    }

    const dodaj = () => aktualizujHistorie('+', liczbaA + liczbaB);
    const odejmij = () => aktualizujHistorie('-', liczbaA - liczbaB);
    const pomnoz = () => aktualizujHistorie('*', liczbaA * liczbaB);
    const podziel = () => {
        if (liczbaB !== 0) {
            aktualizujHistorie('/', liczbaA / liczbaB);
        }
    }

    const onAppCalculationHistoryClick = (index) => {
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        setLiczbaA(historia[index].a);
        setLiczbaB(historia[index].b);
        setWynik(historia[index].wynik);
    }

    return {
        liczbaA,
        liczbaB,
        wynik,
        historia,
        liczbaAOnChange,
        liczbaBOnChange,
        dodaj,
        odejmij,
        pomnoz,
        podziel,
        onAppCalculationHistoryClick
    };
}
