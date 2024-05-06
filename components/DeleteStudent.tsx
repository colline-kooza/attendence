"use client"
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deletedStudent } from '@/actions/DeleteStudent';
import { toast } from './ui/use-toast';

export default function DeleteStudent ({id}:any) {
  // console.log(id , endpoint)
  const router= useRouter()
  const handleDelete = async () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {

            try {
            await deletedStudent(id)
            toast({
                description: 'Successfully deleted student',
              });
              window.location.reload()
            } catch (error) {
              console.error('Error:', error);
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <button
      onClick={handleDelete}
      className=""
    >
     <Trash2 size={24} className='text-red-600'/>
    </button>
  );
}
