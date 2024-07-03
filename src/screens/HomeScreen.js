import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import defaultStyles from '../assets/styles';
import {Icon, IconButton} from '../components';

import {CATEGORIES} from '../assets/data';
import {FlatList} from 'react-native-gesture-handler';

const renderNavBar = () => {
  return (
    <View style={styles.navBar}>
      <IconButton
        style={styles.navBarIcon}
        onPress={() => console.log('Back')}
        src={defaultStyles.icons.back_arrow}
        size={30}
        tintColor={defaultStyles.COLORS.primary}
      />
      <IconButton
        style={[styles.navBarIcon, {alignItems: 'flex-end'}]}
        onPress={() => console.log('More')}
        name={defaultStyles.icons.more}
        size={30}
        tintColor={defaultStyles.COLORS.primary}
      />
    </View>
  );
};

const renderHeader = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text
          style={{
            color: defaultStyles.COLORS.primary,
            ...defaultStyles.FONTS.h2,
          }}>
          My expenses
        </Text>
        <Text
          style={{
            color: defaultStyles.COLORS.darkgray,
            ...defaultStyles.FONTS.h3,
          }}>
          Summary (private)
        </Text>
      </View>
      <View style={styles.headerSub2}>
        <View style={styles.headerDetails}>
          <Icon
            name={defaultStyles.icons.calendar}
            size={20}
            tintColor={defaultStyles.COLORS.lightBlue}
          />
        </View>
        <View style={styles.headerDate}>
          <Text
            style={{
              color: defaultStyles.COLORS.primary,
              ...defaultStyles.FONTS.h3,
            }}>
            27 Jun, 2024
          </Text>
          <Text
            style={{
              ...defaultStyles.FONTS.body3,
              color: defaultStyles.COLORS.darkgray,
            }}>
            18% more than last month
          </Text>
        </View>
      </View>
    </View>
  );
};

const renderCategoryHeader = (viewMode, setViewMode, totalCategories = 0) => {
  return (
    <View style={styles.categoryHeader}>
      {/** Title */}
      <View>
        <Text
          style={{
            color: defaultStyles.COLORS.primary,
            textTransform: 'uppercase',
            ...defaultStyles.FONTS.h3,
          }}>
          categories
        </Text>
        <Text
          style={{
            color: defaultStyles.COLORS.darkgray,
            ...defaultStyles.FONTS.body4,
          }}>
          {`${totalCategories} Total`}
        </Text>
      </View>
      {/** Buttons */}
      <View style={{flexDirection: 'row'}}>
        <IconButton
          src={defaultStyles.icons.chart}
          size={20}
          iconStyle={{resizeMode: 'contain'}}
          tintColor={
            viewMode === 'chart'
              ? defaultStyles.COLORS.white
              : defaultStyles.COLORS.darkgray
          }
          style={[
            styles.categoryHeaderBtn,
            {
              backgroundColor:
                viewMode === 'chart' ? defaultStyles.COLORS.secondary : null,
            },
          ]}
          onPress={() => setViewMode('chart')}
        />
        <IconButton
          src={defaultStyles.icons.menu}
          size={20}
          iconStyle={{resizeMode: 'contain'}}
          tintColor={
            viewMode === 'list'
              ? defaultStyles.COLORS.white
              : defaultStyles.COLORS.darkgray
          }
          style={[
            styles.categoryHeaderBtn,
            {
              backgroundColor:
                viewMode === 'list' ? defaultStyles.COLORS.secondary : null,
            },
          ]}
          onPress={() => setViewMode('list')}
        />
      </View>
    </View>
  );
};

const renderCategoryList = (
  categories,
  animationHeight,
  showMoreToggle,
  setShowMoreToggle,
  setSelectedCategory,
) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.categoryItem, styles.shadow]}
        onPress={() => setSelectedCategory(item)}>
        <Icon name={item.icon} size={20} tintColor={item.color} />
        <Text
          style={{
            marginLeft: defaultStyles.SIZES.base,
            color: defaultStyles.COLORS.primary,
            ...defaultStyles.FONTS.h4,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{paddingHorizontal: defaultStyles.SIZES.padding - 5}}>
      <Animated.View style={{height: animationHeight}}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </Animated.View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginVertical: defaultStyles.SIZES.base,
          justifyContent: 'center',
        }}
        onPress={() => {
          if (showMoreToggle) {
            Animated.timing(animationHeight, {
              toValue: 115,
              duration: 300,
              useNativeDriver: false,
            }).start();
          } else {
            Animated.timing(animationHeight, {
              toValue: 172.5,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }
          setShowMoreToggle(!showMoreToggle);
        }}>
        <Text style={{...defaultStyles.FONTS.body4}}>
          {showMoreToggle ? 'LESS' : 'MORE'}
        </Text>
        <Image
          source={
            showMoreToggle
              ? defaultStyles.icons.up_arrow
              : defaultStyles.icons.down_arrow
          }
          style={{marginLeft: 5, width: 15, height: 15, alignSelf: 'center'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const renderIncomingExpensesTitle = total => {
  return (
    <View
      style={{
        padding: defaultStyles.SIZES.padding,
        backgroundColor: defaultStyles.COLORS.lightGray2,
      }}>
      <Text
        style={{
          ...defaultStyles.FONTS.h3,
          color: defaultStyles.COLORS.primary,
        }}>
        INCOMING EXPENSES
      </Text>
      <Text
        style={{
          ...defaultStyles.FONTS.body4,
          color: defaultStyles.COLORS.darkgray,
        }}>{`${total} Total`}</Text>
    </View>
  );
};

const renderIncomingExpenses = selectedCategory => {
  let allExpenses = selectedCategory ? selectedCategory.expenses : [];
  // Filter Pending expenses
  let incomingExpenses = allExpenses.filter(exp => exp.status == 'P');
  return (
    <View>
      {renderIncomingExpensesTitle(12)}
      {incomingExpenses.length > 0 && <FlatList />}
      {incomingExpenses.length == 0 && (
        <View
          style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
          <Text
            style={{
              color: defaultStyles.COLORS.primary,
              ...defaultStyles.FONTS.h3,
            }}>
            No Record
          </Text>
        </View>
      )}
    </View>
  );
};

const HomeScreen = () => {
  // Dummy Date
  // const confirmStatus = 'C';
  // const pendingStatus = 'P';

  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115),
  ).current;

  const [categories, setCategories] = useState(CATEGORIES);
  const [viewMode, setViewMode] = useState('chart');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMoreToggle, setShowMoreToggle] = useState(false);
  return (
    <View style={styles.screen}>
      {/** Nav bar section */}
      {renderNavBar()}

      {/** Header section */}
      {renderHeader()}

      {/** render category header section */}
      {renderCategoryHeader(viewMode, setViewMode, categories.length)}

      {/** Categories section */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
        }}>
        {viewMode == 'list' && (
          <View>
            {renderCategoryList(
              categories,
              categoryListHeightAnimationValue,
              showMoreToggle,
              setShowMoreToggle,
              setSelectedCategory,
            )}
            {renderIncomingExpenses()}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: defaultStyles.COLORS.lightGray2,
  },
  navBar: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: defaultStyles.SIZES.padding,
    backgroundColor: defaultStyles.COLORS.white,
  },
  navBarIcon: {
    justifyContent: 'center',
    width: 50,
  },
  header: {
    paddingHorizontal: defaultStyles.SIZES.padding,
    paddingVertical: defaultStyles.SIZES.padding,
    backgroundColor: defaultStyles.COLORS.white,
  },
  headerSub2: {
    flexDirection: 'row',
    marginTop: defaultStyles.SIZES.padding,
    alignItems: 'center',
  },
  headerDetails: {
    height: 50,
    width: 50,
    backgroundColor: defaultStyles.COLORS.lightGray,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerDate: {
    marginLeft: defaultStyles.SIZES.padding,
  },
  categoryHeader: {
    flexDirection: 'row',
    padding: defaultStyles.SIZES.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryHeaderBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  categoryItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    paddingVertical: defaultStyles.SIZES.radius,
    paddingHorizontal: defaultStyles.SIZES.padding,
    borderRadius: 5,
    backgroundColor: defaultStyles.COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default HomeScreen;
