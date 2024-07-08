import React, { useState, FormEvent } from 'react';
import { Container, Form, Button, Spinner, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics } from '@vercel/analytics/react';

type ApiResponse = Record<string, unknown> | null;

function Home() {
  const [user, setUser] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [repo, setBrand] = useState<string>('');
  const [result, setResult] = useState<ApiResponse>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMakeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    fetchData(`/api/github/${user}`);
  };

  const handleBrandSubmit = async (event: FormEvent) => {
    event.preventDefault();
    fetchData(`/api/github/${owner}/${repo}`);
  };

  const fetchData = async (url: string) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data: ApiResponse = await response.json();
        setResult(data);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setResult({ error: 'Error fetching data: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 className="mb-4" style={{ color: '#333', textAlign: 'center' }}>CarChat Plugin</h1>
      <p style={{ fontSize: '1.2em', lineHeight: '1.6', color: '#666' }}>
        This plugin is designed to provide insights into CarMake repositories and users. Whether you are a developer looking for detailed statistics about a repository, or a project manager comparing the growth of different repositories, this plugin has got you covered.
        <a href="https://github.com/ResearchCar/chat-plugin-car-gadgets" style={{ color: '#007bff' }}>Source Code</a>
      </p>

      <Card className="mb-4 shadow">
        <Card.Body>
          <Form onSubmit={handleMakeSubmit}>
            <h2 className="mb-3" style={{ color: '#333' }}>User Info</h2>
            <Form.Control
              type="text"
              placeholder="Enter Car-Reseacher username... (e.g., ResearchCar)"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{ borderRadius: '0.25rem' }}
            />
            <Button className="mt-3" variant="primary" type="submit" disabled={loading} style={{ borderRadius: '0.25rem' }}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow">
        <Card.Body>
          <Form onSubmit={handleBrandSubmit}>
            <h2 className="mb-3" style={{ color: '#333' }}>Brand Info</h2>
            <Form.Control
              type="text"
              placeholder="Enter Car-Reseacher's username... (e.g., ResearchCar)"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              style={{ borderRadius: '0.25rem' }}
            />
            <Form.Control
              className="mt-3"
              type="text"
              placeholder="Enter Car Brand name... (e.g., BrandCar, PublicCar)"
              value={repo}
              onChange={(e) => setBrand(e.target.value)}
              style={{ borderRadius: '0.25rem' }}
            />
            <Button className="mt-3" variant="primary" type="submit" disabled={loading} style={{ borderRadius: '0.25rem' }}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {result && (
        <Card>
          <Card.Body>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Card.Body>
        </Card>
      )}
    <Analytics />
    </Container>
  );
}

export default Home;
