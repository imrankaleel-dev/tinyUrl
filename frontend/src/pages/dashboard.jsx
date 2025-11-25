import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createNewLink, deleteLink, getAllLinks } from "../api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date";

const Dashboard = () => {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newURL, setNewURL] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [linksLoading, setLinksLoading] = useState(true);

  const fetchLinks = useCallback(async () => {
    setLinksLoading(true);

    const links = await getAllLinks();
    setLinks(links || []);
    setLinksLoading(false);
  }, []);

  // Filter logic
  useEffect(() => {
    const filteredLinks = links.filter(
      (link) =>
        link.short.toLowerCase().includes(search.toLowerCase()) ||
        link.real.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredData(filteredLinks);
  }, [search, links]);

  useEffect(() => {
    fetchLinks();
  }, []);

  // Add new link
  const handleAdd = useCallback(async () => {
    await createNewLink(newURL);

    setNewURL("");
    setShowAddModal(false);
    fetchLinks();
  }, [newURL, setNewURL, fetchLinks]);

  // Delete link
  const handleDelete = useCallback(
    async (shortLink) => {
      await deleteLink(shortLink);
      fetchLinks();
    },
    [fetchLinks]
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>TinyLink Dashboard</h2>
        <div className="d-flex">
          <Button onClick={() => setShowAddModal(true)}>Add Link</Button>
          <Button variant="success" className="ms-2" onClick={() => navigate("/healthz")}>
            Health
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by code or URL..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Links Table */}

      {linksLoading ? (
        <div
          class="d-flex justify-content-center align-items-center w-100"
          style={{ height: "200px" }}
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Short Code</th>
              <th>Target URL</th>
              <th>Total Clicks</th>
              <th>Last Clicked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((link) => (
              <tr key={link.id}>
                <td>
                  <a
                    href={`${window.location.origin}/${link.short}`}
                    target="_blank"
                  >
                    {link.short}
                  </a>
                </td>
                <td>{link.real}</td>
                <td>{link.access_count}</td>
                <td>{link.last_access ? formatDate(link.last_access) : "—"}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(link.short)}
                  >
                    Delete
                  </Button>

                  <Button
                    className="ms-2"
                    variant="info"
                    size="sm"
                    onClick={() => navigate(`code/${link.short}`)}
                  >
                    Stats
                  </Button>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No links found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Add Link Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Target URL *</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com"
                value={newURL}
                onChange={(e) => setNewURL(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Link
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
