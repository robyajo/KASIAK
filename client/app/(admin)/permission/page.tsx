"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Shield,
  Users,
  Settings,
  Eye,
  Lock,
} from "lucide-react";

// Mock data
const initialRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Akses penuh ke semua fitur sistem",
    permissions: [
      "user.create",
      "user.read",
      "user.update",
      "user.delete",
      "role.create",
      "role.read",
      "role.update",
      "role.delete",
      "permission.manage",
    ],
    userCount: 2,
    color: "bg-red-500",
  },
  {
    id: 2,
    name: "Admin",
    description: "Akses ke sebagian besar fitur administrasi",
    permissions: [
      "user.create",
      "user.read",
      "user.update",
      "role.read",
      "permission.read",
    ],
    userCount: 5,
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Manager",
    description: "Akses ke fitur manajemen tim",
    permissions: ["user.read", "user.update", "role.read"],
    userCount: 8,
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "User",
    description: "Akses dasar untuk pengguna biasa",
    permissions: ["user.read"],
    userCount: 45,
    color: "bg-gray-500",
  },
];

const availablePermissions = [
  { id: "user.create", name: "Buat User", category: "User Management" },
  { id: "user.read", name: "Lihat User", category: "User Management" },
  { id: "user.update", name: "Edit User", category: "User Management" },
  { id: "user.delete", name: "Hapus User", category: "User Management" },
  { id: "role.create", name: "Buat Role", category: "Role Management" },
  { id: "role.read", name: "Lihat Role", category: "Role Management" },
  { id: "role.update", name: "Edit Role", category: "Role Management" },
  { id: "role.delete", name: "Hapus Role", category: "Role Management" },
  {
    id: "permission.manage",
    name: "Kelola Permission",
    category: "Permission Management",
  },
  {
    id: "permission.read",
    name: "Lihat Permission",
    category: "Permission Management",
  },
  { id: "report.view", name: "Lihat Laporan", category: "Reports" },
  { id: "report.export", name: "Export Laporan", category: "Reports" },
  { id: "settings.manage", name: "Kelola Pengaturan", category: "Settings" },
];

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Super Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "User",
    status: "Active",
  },
];

export default function RolePermissionManagement() {
  const [roles, setRoles] = useState(initialRoles);
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveRole = () => {
    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id ? { ...role, ...newRole } : role
        )
      );
    } else {
      const newId = Math.max(...roles.map((r) => r.id)) + 1;
      setRoles([
        ...roles,
        {
          id: newId,
          ...newRole,
          userCount: 0,
          color: "bg-purple-500",
        },
      ]);
    }
    setIsRoleDialogOpen(false);
    setEditingRole(null);
    setNewRole({ name: "", description: "", permissions: [] });
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsRoleDialogOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...newUser } : user
        )
      );
    } else {
      const newId = Math.max(...users.map((u) => u.id)) + 1;
      setUsers([...users, { id: newId, ...newUser }]);
    }
    setIsUserDialogOpen(false);
    setEditingUser(null);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsUserDialogOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const togglePermission = (permissionId) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Management Role & Permission</h1>
          <p className="text-muted-foreground">
            Kelola role dan permission pengguna sistem
          </p>
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Role Management
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Permission Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
            <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingRole(null);
                    setNewRole({ name: "", description: "", permissions: [] });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingRole ? "Edit Role" : "Tambah Role Baru"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingRole
                      ? "Edit informasi role dan permission"
                      : "Buat role baru dengan permission yang sesuai"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">Nama Role</Label>
                    <Input
                      id="role-name"
                      value={newRole.name}
                      onChange={(e) =>
                        setNewRole({ ...newRole, name: e.target.value })
                      }
                      placeholder="Masukkan nama role"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-description">Deskripsi</Label>
                    <Textarea
                      id="role-description"
                      value={newRole.description}
                      onChange={(e) =>
                        setNewRole({ ...newRole, description: e.target.value })
                      }
                      placeholder="Masukkan deskripsi role"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Permission</Label>
                    <div className="space-y-4 max-h-60 overflow-y-auto border rounded-md p-4">
                      {Object.entries(groupedPermissions).map(
                        ([category, permissions]) => (
                          <div key={category} className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">
                              {category}
                            </h4>
                            <div className="space-y-2 ml-4">
                              {permissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={permission.id}
                                    checked={newRole.permissions.includes(
                                      permission.id
                                    )}
                                    onCheckedChange={() =>
                                      togglePermission(permission.id)
                                    }
                                  />
                                  <Label
                                    htmlFor={permission.id}
                                    className="text-sm"
                                  >
                                    {permission.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsRoleDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button onClick={handleSaveRole}>
                    {editingRole ? "Update" : "Simpan"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((role) => (
              <Card key={role.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${role.color}`} />
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditRole(role)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pengguna</span>
                      <Badge variant="secondary">{role.userCount}</Badge>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">
                        Permission:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="text-xs"
                          >
                            {
                              availablePermissions.find(
                                (p) => p.id === permission
                              )?.name
                            }
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pengguna..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
            <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingUser(null);
                    setNewUser({
                      name: "",
                      email: "",
                      role: "",
                      status: "Active",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingUser
                      ? "Edit informasi pengguna"
                      : "Tambah pengguna baru ke sistem"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Nama</Label>
                    <Input
                      id="user-name"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                      placeholder="Masukkan nama pengguna"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                      placeholder="Masukkan email pengguna"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Role</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) =>
                        setNewUser({ ...newUser, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-status">Status</Label>
                    <Select
                      value={newUser.status}
                      onValueChange={(value) =>
                        setNewUser({ ...newUser, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsUserDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button onClick={handleSaveUser}>
                    {editingUser ? "Update" : "Simpan"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overview Permission</CardTitle>
              <CardDescription>
                Daftar semua permission yang tersedia dalam sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(
                  ([category, permissions]) => (
                    <div key={category} className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        {category}
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {permissions.map((permission) => (
                          <Card key={permission.id} className="p-4">
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-sm">
                                  {permission.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {permission.id}
                                </p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
