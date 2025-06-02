import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCompany(data: {
  corporateName: string;
  tradeName: string;
  cnpj: string;
  website?: string;
  businessSegment: string;
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
    legalRepresentative: string;
    representativeEmail: string;
  };
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
  };
}) {
  return await prisma.company.create({
    data: {
      corporateName: data.corporateName,
      tradeName: data.tradeName,
      cnpj: data.cnpj,
      website: data.website,
      businessSegment: data.businessSegment,
      contact: {
        create: data.contact,
      },
      address: {
        create: data.address,
      },
    },
    include: {
      contact: true,
      address: true,
    },
  });
}

export async function getCompany(tenantId:string) {
  return await prisma.company.findUnique({
    where: {id: tenantId},
    include: {
      contact: true,
      address: true,
    },
  });
}

export async function updateCompany(tenantId:string, data:any) {
  const { contact, address, ...companyData} = data;

  const updatePayload: any = {
    ...companyData,
  };

  if(contact) {
    updatePayload.contact = {
      update: contact,
    };
  }

  if(address) {
    updatePayload.address = {
      update: address,
    };
  }

  return await prisma.company.update({
    where: {id: tenantId},
    data: updatePayload,
    include: {
      contact: true,
      address: true,
    },
  });
}

export async function getCompanyUsers(tenantId:string) {
  return await prisma.user.findMany({
    where: {tenantId},
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      tenantId: true,
    },
  });
}