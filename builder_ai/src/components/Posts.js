/* @flow */
import React from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { times } from 'lodash'

const LoadingIndicator = ({ loading }) => (
  loading ? (
    <View style={styles.loading}>
      <ActivityIndicator
        animating={true}
        style={[styles.loading]}
        size="large"
      />
    </View>
  ) : null
)

function _renderFooter(pagination) {
  return (
    <View style={styles.footer}>
      {pagination.loading ? (
        <ActivityIndicator color="black" style={{ margin: 15 }} />
      ) : null}
    </View>
  );
}
function _renderRow(row) {
  if (row.type === 'Loading') {
    return <LoadingIndicator loading={row.loading} />
  } else {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{row.item.title}</Text>
        <Text style={styles.desc}>Author - {row.item.author}</Text>
        <Text style={styles.desc}>Date - {row.item.created_at}</Text>
      </View>
    )
  }
}


function loadMoreData(pagination, getPosts) {
  console.log("Scroll End")
  const { page } = pagination
  getPosts(page + 1)
}

export const Posts = (props) => {
  const { posts, pagination, ds, getPosts } = props
  const loading = {
    type: 'Loading',
    loading: pagination.loading
  }

  let postData = [...posts, loading]
  return (
    <FlatList
      style={{ width: '100%' }}
      keyExtractor={(item, index) => index.toString()}
      data={postData}
      onEndReached={() => loadMoreData(pagination, getPosts)}
      onEndReachedThreshold={0.5}
      renderItem={row => _renderRow(row, pagination)}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => getPosts(0)}
        />
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={_renderFooter(pagination)}
    />
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F5FCFF'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  desc: {
    fontSize: 13
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
})

export default Posts
