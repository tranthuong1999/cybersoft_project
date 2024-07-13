import React from 'react';

const Favorites = () => {
  return (
    <div>
      <p>
        {[...new Array(50)]
          .map(
            () => `odio aenean sed adipiscing. Amet nisl
            suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
            quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
            proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
            tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
            varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
            Lorem donec massa sapien faucibus et molestie ac.`,
          )
          .join('\n')}
      </p>
    </div>
  );
};

export default Favorites;
