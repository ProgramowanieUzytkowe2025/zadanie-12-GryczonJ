import './AppCalculator.css';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator';
import { useState, useEffect, useReducer } from 'react'; 

function statusReducer(state, action) {
    switch (action.type) {
        case 'ZMIANA_A': return 'Zmodyfikowano wartość liczby A';
        case 'ZMIANA_B': return 'Zmodyfikowano wartość liczby B';
        case 'OBLICZENIA': return 'Wykonano obliczenia';
        case 'PRZYWROCENIE': return 'Przywrócono historyczny stan';
        default: return 'Brak';
    }
}

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
    const [ostatniaCzynnosc, dispatch] = useReducer(statusReducer, 'Brak');
    const przywrocHistorieHandler = (index) => {
            onAppCalculationHistoryClick(index);
            dispatch({ type: 'PRZYWROCENIE' }); // ZAMIAST setOstatniaCzynność
        };
    let zablokujPrzyciski = liczbaA === null || liczbaB === null;
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
                <input 
                    id="liczba1" 
                    type="number" 
                    value={liczbaA ?? ''} 
                    onChange={(e) => {
                        liczbaAOnChange(e.target.value);
                        dispatch({ type: 'ZMIANA_A' }); 
                    }} 
                />
            </div>
            <div className='app-calculator-pole'>
                <label htmlFor="liczba2">Liczba 2</label>
                <input 
                    id="liczba2" 
                    type="number" 
                    value={liczbaB ?? ''} 
                    onChange={(e) => {
                        liczbaBOnChange(e.target.value);
                        dispatch({ type: 'ZMIANA_B' }); 
                    }} 
                />
            </div>

            <hr />

            <div className='app-calculator-przyciski'>
                <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => { dodaj(); dispatch({ type: 'OBLICZENIA' }); }} />
                <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => { odejmij(); dispatch({ type: 'OBLICZENIA' }); }} />
                <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => { pomnoz(); dispatch({ type: 'OBLICZENIA' }); }} />
                <AppButton disabled={zablokujDzielenie} title="/" onClick={() => { podziel(); dispatch({ type: 'OBLICZENIA' }); }} />
            </div>

            <hr />
            
            <div className='app-calculator-historia'>
                <div>Ostatnia czynność: {ostatniaCzynnosc}</div>
                <AppCalculationHistory historia={historia} onClick={przywrocHistorieHandler} />
            </div>
        </div>
    );
}