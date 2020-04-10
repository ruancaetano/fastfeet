import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '~/pages/Login';
import OrdersList from '~/pages/OrdersList';
import OrdersForm from '~/pages/OrdersForm';
import DelivermenList from '~/pages/DelivermenList';
import DelivermenForm from '~/pages/DelivermenForm';
import RecipientsList from '~/pages/RecipientsList';
import RecipientsForm from '~/pages/RecipientsForm';
import ProblemsList from '~/pages/ProblemsList';

import CustomRoute from './CustomRoute';

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Login} />
      <CustomRoute exact isPrivate path="/orders" component={OrdersList} />
      <CustomRoute isPrivate path="/orders/new" component={OrdersForm} />
      <CustomRoute
        isPrivate
        path="/orders/:orderId/edit"
        component={OrdersForm}
      />
      <CustomRoute
        exact
        isPrivate
        path="/delivermen"
        component={DelivermenList}
      />
      <CustomRoute
        exact
        isPrivate
        path="/delivermen/new"
        component={DelivermenForm}
      />
      <CustomRoute
        isPrivate
        path="/delivermen/:delivermanId/edit"
        component={DelivermenForm}
      />
      <CustomRoute
        exact
        isPrivate
        path="/recipients"
        component={RecipientsList}
      />
      <CustomRoute
        exact
        isPrivate
        path="/recipients/new"
        component={RecipientsForm}
      />
      <CustomRoute
        isPrivate
        path="/recipients/:recipientId/edit"
        component={RecipientsForm}
      />
      <CustomRoute exact isPrivate path="/problems" component={ProblemsList} />
      <Route component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}
