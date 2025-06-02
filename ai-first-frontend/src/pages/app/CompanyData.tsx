import React, { useEffect, useState } from 'react';
import { Check, Pencil, Save, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../../components/ui/Table';
import { User } from '../../types';
import { useApi } from '../../services/api';

// Mock data for demonstration


const CompanyData: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [company, setCompany] = useState<any | null>(null);
  const [employees, setEmployees] = useState<User[]>([]);
  const {fetchCompanyData, fetchCompanyUsers } = useApi();

  useEffect(() => {
    const loadData = async () => {
      try{
        const [companyData, usersList] = await Promise.all([
          fetchCompanyData(),
          fetchCompanyUsers(),
        ]);

        setCompany({
          ...companyData,
          corporateContact: companyData.contact.phone || '',
          businessWhatsapp: companyData.contact.whatsapp || '',
          industrySegment: companyData.businessSegment || '',
        });
        setEmployees(usersList);
      } catch (error) {
        console.error("Erro ao carregar dados da empresa: ", error);
      }
    };

    loadData();
  }, []);

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCompany((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveCompany = () => {
    console.log('Saving company data:', company);
    setEditMode(false);
    // In a real app, you would save the company data to the server here
  };

  if(!company){
    return <div>Carregando dados da empresa...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Company Data</h1>
        {!editMode ? (
          <Button variant="outline" onClick={handleToggleEditMode}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Company
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleToggleEditMode}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveCompany}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Corporate Name (Razão Social)"
              name="corporateName"
              value={company.corporateName}
              onChange={handleCompanyChange}
              disabled={!editMode}
            />

            <Input
              label="Trade Name (Nome Fantasia)"
              name="tradeName"
              value={company.tradeName}
              onChange={handleCompanyChange}
              disabled={!editMode}
            />

            <Input
              label="CNPJ"
              name="cnpj"
              value={company.cnpj}
              onChange={handleCompanyChange}
              disabled={!editMode}
            />

            <Input
              label="Website"
              name="website"
              value={company.website}
              onChange={handleCompanyChange}
              disabled={!editMode}
            />

            <Input
              label="Industry Segment"
              name="industrySegment"
              value={company.industrySegment}
              onChange={handleCompanyChange}
              disabled={!editMode}
            />

            <Input
              label="Corporate Contact"
              name="corporateContact"
              value={company.corporateContact}
              onChange={handleCompanyChange}
              disabled={!editMode}
            />

            <Input
              label="Business WhatsApp"
              name="businessWhatsapp"
              value={company.businessWhatsapp}
              onChange={handleCompanyChange}
              disabled={!editMode}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Employees</CardTitle>
          <Button variant="outline" size="sm">
            Add Employee
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.name}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyData;