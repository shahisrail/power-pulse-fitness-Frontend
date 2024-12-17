import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Address = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  countryName: string;
  streetAddress: string;
  apartment?: string;
  town: string;
  postCode: number;
  phone: number;
  isDefault: boolean;
};

type AddressState = {
  defaultAddresses: Record<string, Address | null>; // Stores default address by userId
};

const initialState: AddressState = {
  defaultAddresses: {}, // Initialize with an empty object
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateDefaultAddress: (state, action: PayloadAction<Address>) => {
      const address = action.payload;
      if (address.isDefault) {
        // Update the default address for the specific user
        state.defaultAddresses[address.userId] = address;
      } else if (
        !address.isDefault &&
        state.defaultAddresses[address.userId]?.id === address.id
      ) {
        // If the address is no longer default and matches the current default, clear it
        state.defaultAddresses[address.userId] = null;
      }
    },

    clearDefaultAddress: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      // Clear the default address for the specific user
      state.defaultAddresses[userId] = null;
    },
  },
});

// Selector to get the default address for a specific user
export const selectDefaultAddress = (
  state: { address: AddressState },
  userId: string
) => state.address.defaultAddresses[userId];

export const { updateDefaultAddress, clearDefaultAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
