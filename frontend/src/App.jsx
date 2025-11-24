import { useState, useEffect } from 'react';

export default function App() {
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState('');

  // URL base do backend hospedado
  const API_URL = 'https://backendo-projeto.onrender.com/api/places';

  // Busca dados do backend
  useEffect(() => {
    const url = filter ? `${API_URL}?type=${filter}` : API_URL;

    fetch(url)
      .then((res) => res.json())
      .then(setPlaces)
      .catch((err) => console.error('Erro ao carregar estabelecimentos:', err));
  }, [filter]);

  // Categorias do Localiza Fácil
  const categories = [
    { key: 'restaurante', label: 'Restaurantes' },
    { key: 'farmacia', label: 'Farmácias' },
    { key: 'mercado', label: 'Mercados' },
    { key: 'posto', label: 'Postos de Combustível' },
    { key: '', label: 'Todos' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📍 Localiza Fácil</h1>
      <p>Encontre estabelecimentos próximos com simplicidade e rapidez.</p>

      {/* Botões de filtro */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: filter === cat.key ? '#1976d2' : '#e0e0e0',
              color: filter === cat.key ? '#fff' : '#000',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de resultados */}
      <div>
        {places.length === 0 ? (
          <p>Carregando estabelecimentos...</p>
        ) : (
          places.map((place) => (
            <div
              key={place.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: '#fafafa'
              }}
            >
              <h3 style={{ margin: '0 0 8px 0' }}>{place.name}</h3>
              <p style={{ margin: '4px 0', color: '#555' }}>{place.address}</p>
              <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#777' }}>
                {place.open24h ? '✅ Aberto 24h' : '🕒 Horário comercial'}
              </p>
              <a
                href={`https://maps.google.com/?q=${place.lat},${place.lng}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold'
                }}
              >
                🗺️ Abrir no Google Maps
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}