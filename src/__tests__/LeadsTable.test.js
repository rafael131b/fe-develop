import { render, screen, fireEvent } from '@testing-library/react';
import LeadsTable from '../components/LeadsTable';

const mockLeadsData = {
  leads: [
    { id: 1, name: 'John Doe', company: 'ABC Corp', email: 'john@example.com', source: 'Website', score: 85, status: 'new' },
    { id: 2, name: 'Jane Smith', company: 'XYZ Ltd', email: 'jane@example.com', source: 'Referral', score: 92, status: 'qualified' },
  ],
  filter: 'all',
  sort: 'score-desc',
  setFilter: jest.fn(),
  setSort: jest.fn(),
  searchLeads: jest.fn(() => mockLeadsData.leads),
};

const mockConvertingLeads = new Set();

describe('LeadsTable', () => {
  it('should render leads data', () => {
    render(
      <LeadsTable
        leadsData={mockLeadsData}
        onConvertLead={jest.fn()}
        onRowClick={jest.fn()}
        convertingLeads={mockConvertingLeads}
      />
    );

    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ABC Corp').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Jane Smith').length).toBeGreaterThan(0);
  });

  it('should call onRowClick when table row is clicked', () => {
    const mockOnRowClick = jest.fn();
    render(
      <LeadsTable
        leadsData={mockLeadsData}
        onConvertLead={jest.fn()}
        onRowClick={mockOnRowClick}
        convertingLeads={mockConvertingLeads}
      />
    );

    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody tr');
    fireEvent.click(rows[0]);

    expect(mockOnRowClick).toHaveBeenCalledWith(mockLeadsData.leads[0]);
  });

  it('should filter leads based on search input', () => {
    const mockSearchLeads = jest.fn(() => [mockLeadsData.leads[0]]);
    render(
      <LeadsTable
        leadsData={{ ...mockLeadsData, searchLeads: mockSearchLeads }}
        onConvertLead={jest.fn()}
        onRowClick={jest.fn()}
        convertingLeads={mockConvertingLeads}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search name/company...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(mockSearchLeads).toHaveBeenCalledWith('John');
  });

  it('should call onConvertLead when convert button is clicked', () => {
    const mockOnConvertLead = jest.fn();
    render(
      <LeadsTable
        leadsData={mockLeadsData}
        onConvertLead={mockOnConvertLead}
        onRowClick={jest.fn()}
        convertingLeads={mockConvertingLeads}
      />
    );

    const convertButtons = screen.getAllByText('Convert');
    fireEvent.click(convertButtons[0]);

    expect(mockOnConvertLead).toHaveBeenCalledWith(mockLeadsData.leads[0]);
  });
});