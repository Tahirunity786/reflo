'use client';
import React, { useState } from 'react';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';

const AuthModals = ( {isOpen}) => {
  const [showSignIn, setShowSignIn] = useState(isOpen);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
      />
    </>
  );
};

export default AuthModals;
