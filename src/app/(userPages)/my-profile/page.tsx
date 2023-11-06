'use client'
import { MyProfilePageComponent } from '@/components/MyProfilePage';
import { useMyProfile } from '@/hooks/myProfile';
import { useAppSelector } from '@/hooks/redux'
import React from 'react'

function MyProfile() {
  return <MyProfilePageComponent/>
}

export default MyProfile