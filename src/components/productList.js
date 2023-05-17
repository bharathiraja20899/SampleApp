import React, {useState, useEffect} from 'react';
import {
  VirtualizedList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {appcolors} from '../shared/appcolors';
import {SearchBar, Card, Divider, Header} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {data} from '../shared/productData';

const ProductList = () => {
  // Sample product data
  const [products, setProducts] = useState(data);

  const renderItem = ({item}) => (
    <Card containerStyle={{borderRadius: 7}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        {/* left view */}
        <View style={{flex: 0.3}}>
          <Image
            source={{
              uri: item.img,
            }}
            style={{height: 100, width: '100%'}}
          />
        </View>

        {/* Right View */}
        <View style={{flex: 0.7, paddingLeft: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: appcolors.primary,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <TouchableOpacity>
              <MaterialCommunityIcons name="circle-edit-outline" size={20} />
            </TouchableOpacity>
          </View>

          <Divider style={{paddingTop: 10}} />

          <View style={{paddingTop: 5}}>
            <Text style={{color: appcolors.grey, fontSize: 14}}>
              Price : ₹{Number(item.price).toFixed(2)}
            </Text>
            <Text style={{color: appcolors.grey, fontSize: 14, paddingTop: 3}}>
              Tax : ₹{Number(item.tax).toFixed(2)}
            </Text>
            <Text style={{color: appcolors.grey, fontSize: 14, paddingTop: 3}}>
              Instock : {Number(item.stock)}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  //   <View>
  //               <MaterialCommunityIcons name="circle-edit-outline" size={20} />
  //             </View>

  const keyExtractor = item => item.id.toString();

  //   Variable to handle search
  const [search, setSearch] = useState('');

  //   useEffect to be called while searching
  useEffect(() => {
    let temp = data.filter(item => item.name.match(search));
    setProducts([...temp]);
  }, [search]);

  return (
    <View style={{flex: 1, backgroundColor: appcolors.white}}>
      <StatusBar backgroundColor={appcolors.primary} />

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: appcolors.primary,
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name={'menu'}
          size={20}
          color={appcolors.white}
        />
        <Text
          style={{
            color: appcolors.white,
            fontWeight: 'bold',
            marginLeft: '31%',
            fontSize: 16,
          }}>
          Product List
        </Text>
      </View>

      <SearchBar
        placeholder="Search by product name"
        inputStyle={{
          marginRight: '10%',
          fontSize: 14,
        }}
        searchIcon={{size: 25}}
        clearIcon={search ? true : false}
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          marginHorizontal: 6,
        }}
        inputContainerStyle={{
          backgroundColor: appcolors.lightBackgroundColor,
          borderRadius: 7,
          height: 45,
        }}
        value={search}
        onChangeText={text => {
          setSearch(text);
        }}
      />

      <VirtualizedList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemCount={() => products.length}
        getItem={(data, index) => data[index]}
        contentContainerStyle={{flex: products.length ? null : 1 , paddingBottom : 20}}
        ListEmptyComponent={() => {
          return (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>No records found</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProductList;
