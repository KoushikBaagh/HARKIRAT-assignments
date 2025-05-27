import React from 'react';

function ProblematicComponent() {
  throw new Error("Error while rendering from child");
}

export default ProblematicComponent;
