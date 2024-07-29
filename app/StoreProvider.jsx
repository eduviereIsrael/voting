'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/store/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store
  }

  return <Provider store={storeRef.current}>
          <PersistGate loading={null} persistor={persistor} >

            {children}
          </PersistGate>

        </Provider>
}