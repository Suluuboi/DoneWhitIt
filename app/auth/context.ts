import React from 'react';
import { AuthContextInfo } from './types';

const AuthContext = React.createContext<AuthContextInfo>(null)

export default AuthContext