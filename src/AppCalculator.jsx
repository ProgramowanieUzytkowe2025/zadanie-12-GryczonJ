import './AppCalculator.css';
import { useState, useEffect } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator'; 

export function AppCalculator() {
    const {
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
    } = useKalkulator();

    const [porownanie, setPorownanie] = useState('');
    const [ostatniaCzynność, setOstatniaCzynność] = useState('Brak');
    const przywrocHistorieHandler = (index) => {

        
    onAppCalculationHistoryClick(index); // z hooka useKalkulator
    setOstatniaCzynność('Przywrócono historyczny stan');
};
    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

 

    useEffect(() => {
        if (liczbaA == null || liczbaB == null) {
            setPorownanie('');
        } else if (liczbaA === liczbaB) {
            setPorownanie('Liczba A jest równa liczbie B.');
        } else if (liczbaA > liczbaB) {
            setPorownanie('Liczba A jest większa od liczby B.');
        } else {
            setPorownanie('Liczba B jest większa od liczby A.');
        }
    }, [liczbaA, liczbaB]);


    return (
    <div className='app-calculator'>
        <div className='app-calculator-pole'>
            <label>Wynik: </label>
            <span>{wynik}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label>Dynamiczne porównanie liczb: </label>
            <span>{porownanie}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label htmlFor="liczba1">Liczba 1</label>
            <input id="liczba1" type="number" value={liczbaA} onChange={(e) => liczbaAOnChange(e.target.value)} name="liczba1" />
        </div>
        <div className='app-calculator-pole'>
            <label htmlFor="liczba2">Liczba 2</label>
            <input id="liczba2" type="number" value={liczbaB} onChange={(e) => liczbaBOnChange(e.target.value)} name="liczba2" />
        </div>

        <hr />

        <div className='app-calculator-przyciski'>
            <AppButton disabled={zablokujPrzyciski} title="+"  onClick={() => { dodaj(); setOstatniaCzynność('Wykonano obliczenia'); }} />
            <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => { odejmij(); setOstatniaCzynność('Wykonano obliczenia'); }} />
            <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => { pomnoz(); setOstatniaCzynność('Wykonano obliczenia'); }} />
            <AppButton disabled={zablokujDzielenie} title="/" onClick={() => { podziel(); setOstatniaCzynność('Wykonano obliczenia'); }} />
        </div>

        <hr />
        
        <div className='app-calculator-historia'>
            <div>Ostatnia czynność: {ostatniaCzynność}</div>
            <AppCalculationHistory historia={historia} onClick={przywrocHistorieHandler} />

        </div>
    </div>)
}