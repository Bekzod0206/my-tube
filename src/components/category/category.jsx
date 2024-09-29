import { Stack } from '@mui/material'
import { categoriesArr } from '../../constants'
import { colors } from '../../constants/colors'

function Category({selectedCategoryHandler, selectedCategory}) {
  return (
    <Stack direction={'row'} sx={{overflowX: 'scroll'}}>
      {categoriesArr.map(item => (
        <button
          key={item.name}
          className='category-btn'
          style={{
            borderRadius: '0',
            backgroundColor: item.name === selectedCategory && colors.secondary,
            color: item.name === selectedCategory && '#fff'
          }}
          onClick={() => selectedCategoryHandler(item.name)}
        >
          <span style={{
            color: item.name === selectedCategory ? '#fff' : colors.secondary,
            marginRight: '15px'
          }}>
            {item.logo}
          </span>
          <span style={{opacity: 1}}>{item.name}</span>
        </button>
      ))}
    </Stack>
  )
}

export default Category