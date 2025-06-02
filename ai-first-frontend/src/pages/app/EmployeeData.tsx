import React, { useEffect, useState } from 'react';
import { Pencil, Save, X, User, Phone, Mail, Building } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../services/api';

const EmployeeData: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: '',
    address: '',
    emergencyContact: '',
  });
  const { user } = useAuth();
  const { updateUser } = useApi();

  useEffect(() => {
    if (user) {
      setEmployee((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: '',
        position: '',
        department: '',
        hireDate: '',
        address: '',
        emergencyContact: '',
      }));
    }
    console.log("usuário autenticado: ", user);
  }, [user]);

  const handleEmployeeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveEmployee = async () => {
    try {
      await updateUser({
        ...employee,
        image: user?.image,
      });

      setEditMode(false);
    } catch (err) {
      console.error("Erro ao salvar os dados do funcionário: ", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Profile</h1>
        {!editMode ? (
          <Button variant="outline" onClick={handleToggleEditMode}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleToggleEditMode}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEmployee}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User size={64} className="text-primary" />
                </div>
                <h2 className="text-xl font-bold">
                  {employee.name}
                </h2>
                <p className="text-slate-400">{employee.position}</p>
                <p className="text-slate-500 text-sm">{employee.department}</p>

                <div className="mt-6 w-full space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Mail size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="text-sm">{employee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Phone size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Phone</p>
                      <p className="text-sm">{employee.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Building size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Hire Date</p>
                      <p className="text-sm">{employee.hireDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  name="name"
                  value={employee.name}
                  onChange={handleEmployeeChange}
                  disabled={!editMode}
                />

                <Input
                  label="Email"
                  name="email"
                  value={employee.email}
                  onChange={handleEmployeeChange}
                  disabled={!editMode}
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={employee.phone}
                  onChange={handleEmployeeChange}
                  disabled={!editMode}
                />

                <Input
                  label="Position"
                  name="position"
                  value={employee.position}
                  onChange={handleEmployeeChange}
                  disabled={!editMode}
                />

                <Input
                  label="Department"
                  name="department"
                  value={employee.department}
                  onChange={handleEmployeeChange}
                  disabled={!editMode}
                />

                <Input
                  label="Hire Date"
                  name="hireDate"
                  type="date"
                  value={employee.hireDate}
                  onChange={handleEmployeeChange}
                  disabled={!editMode}
                />

                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    name="address"
                    value={employee.address}
                    onChange={handleEmployeeChange}
                    disabled={!editMode}
                  />
                </div>

                <div className="md:col-span-2">
                  <Input
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={employee.emergencyContact}
                    onChange={handleEmployeeChange}
                    disabled={!editMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" fullWidth={false}>
                  Change Password
                </Button>
                <Button variant="outline" fullWidth={false}>
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;