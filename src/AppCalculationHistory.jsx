import './AppCalculationHistory.css'

export function AppCalculationHistory({historia, onClick}) 
{
    const przywrocHistorieHandler = (index) => {
        onAppCalculationHistoryClick(index);  // hook z useKalkulator
        setOstatniaCzynność('Przywrócono historyczny stan');
    }
    
    return (
        <table className='app-calculation-history'>
            <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Równanie</th>
                    <th>Akcja</th>
                </tr>
            </thead>
            <tbody>
                {historia.map((h, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{h.a} {h.operation} {h.b} = {h.wynik}</td>
                        <td><button onClick={() => onClick(index)}>Przywróć</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}